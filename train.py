
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score, precision_score, recall_score, roc_auc_score
from xgboost import XGBClassifier
import shap
import matplotlib.pyplot as plt
import joblib

# Load the dataset
df = pd.read_excel(
    "data/default of credit card clients.xls",
    header=1
)

print("Dataset loaded successfully!")
print("Shape:", df.shape)

# Separate features and target
X = df.drop(columns=["ID", "default payment next month"])
y = df["default payment next month"]

print("X shape:", X.shape)
print("y shape:", y.shape)


# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("X_train shape:", X_train.shape)
print("X_test shape:", X_test.shape)
print("y_train shape:", y_train.shape)
print("y_test shape:", y_test.shape)

# Define feature groups

numerical_features = [
    "LIMIT_BAL",
    "AGE",
    "BILL_AMT1",
    "BILL_AMT2",
    "BILL_AMT3",
    "BILL_AMT4",
    "BILL_AMT5",
    "BILL_AMT6",
    "PAY_AMT1",
    "PAY_AMT2",
    "PAY_AMT3",
    "PAY_AMT4",
    "PAY_AMT5",
    "PAY_AMT6"
]

categorical_features = [
    "SEX",
    "EDUCATION",
    "MARRIAGE"
]

repayment_features = [
    "PAY_0",
    "PAY_2",
    "PAY_3",
    "PAY_4",
    "PAY_5",
    "PAY_6"
]

print("Numerical features:", len(numerical_features))
print("Categorical features:", len(categorical_features))
print("Repayment features:", len(repayment_features))

# Create a scaler for numerical features
numerical_transformer = StandardScaler()

# Create an encoder for categorical features
categorical_transformer = OneHotEncoder(handle_unknown="ignore")

# Combine all preprocessing steps
preprocessor = ColumnTransformer(
    transformers=[
        ("num", numerical_transformer, numerical_features),
        ("cat", categorical_transformer, categorical_features),
        ("repay", "passthrough", repayment_features)
    ]
)

# Learn preprocessing rules from training data
preprocessor.fit(X_train)
print("Preprocessor fitted succesfully")

# Transform the training and testing data 
X_train_processed = preprocessor.transform(X_train)
X_test_processed = preprocessor.transform(X_test)

print("Training data transform:", X_train_processed.shape)
print("Testing data transform:", X_test_processed.shape)

# Display the processed feature names
feature_names = preprocessor.get_feature_names_out()
print("\nProcessed feature names:")
print(feature_names)

# Create the logistic Regression model
model = LogisticRegression(max_iter=1000)

print("\nLogistic Regression model created!")

#Train the model using the processed training data 
model.fit(X_train_processed, y_train)
print("Model trained successfully!")

# make prediction on the test data
y_pred = model.predict(X_test_processed)
print("Prediction generated successfully")

print("\nPredicted classes:")
print(pd.Series(y_pred).value_counts())

print("\nActual classes:")
print(y_test.value_counts())

# Create confusion matrix
cm = confusion_matrix(y_test, y_pred)

print("\nConfusion Matrix:")
print(cm)

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)

print("Model Performance:")
print("accuracy:" , accuracy)
print("Precision:" , precision)
print("Recall:" , recall)

# Get probability of default
y_prob = model.predict_proba(X_test_processed)[:, 1]

print("\nFirst 10 default probabilities:")
print(y_prob[:10])

# Calculate ROC-AUC
roc_auc = roc_auc_score(y_test, y_prob)

print("\nROC-AUC:", roc_auc)

# Check predictions using a lower threshold
threshold = 0.30

y_pred_30 = (y_prob >= threshold).astype(int)

print("\nPredictions using threshold 0.30:")

print("Precision:", precision_score(y_test, y_pred_30))
print("Recall:", recall_score(y_test, y_pred_30))

# Create the XGBoost model
xgb_model = XGBClassifier(
    n_estimators = 200,
    max_depth = 4,
    learning_rate = 0.05,
    random_state = 42,
    eval_metric="logloss"
)

print("\nXGBoost model created !")

# Train the XGBoost model
xgb_model.fit(X_train_processed, y_train)

print("XGBoost model trained successfully!")

# Make prediction using XGBoost
xgb_pred = xgb_model.predict(X_test_processed)
print("\nXGBoost prediction generated!")

# Evaluate XGBoost predictions

xgb_accuracy = accuracy_score(y_test, xgb_pred)
xgb_precision = precision_score(y_test, xgb_pred)
xgb_recall = recall_score(y_test, xgb_pred)

print("\nXGBoost Performance:")
print("Accuracy:", xgb_accuracy)
print("Precision:", xgb_precision)
print("Recall:", xgb_recall)

# Get XGBoost probability of default
xgb_prob = xgb_model.predict_proba(X_test_processed)[:, 1]

print("\nFirst 10 XGBoost default probabilities:")
print(xgb_prob[:10])

# Calculate XGBoost ROC-AUC
xgb_roc_auc = roc_auc_score(y_test, xgb_prob)

print("\nXGBoost ROC-AUC:", xgb_roc_auc)

# Calculate class imbalance ratio
negative_count = (y_train == 0).sum()
positive_count = (y_train == 1).sum()

scale_pos_weight = negative_count / positive_count

print("\nNegative samples:", negative_count)
print("Positive samples:", positive_count)
print("Scale pos weight:", scale_pos_weight)

# Create an XGBoost model that accounts for class imbalance
xgb_balanced_model = XGBClassifier(
    n_estimators=200,
    max_depth=4,
    learning_rate=0.05,
    random_state=42,
    eval_metric="logloss",
    scale_pos_weight=scale_pos_weight
)

print("\nBalanced XGBoost model created!")

# Train the balanced XGBoost model
xgb_balanced_model.fit(X_train_processed, y_train)

print("Balanced XGBoost model trained successfully!")

# Make predictions using the balanced XGBoost model
xgb_balanced_pred = xgb_balanced_model.predict(X_test_processed)

print("\nBalanced XGBoost predictions generated!")

# Evaluate balanced XGBoost
balanced_accuracy = accuracy_score(y_test, xgb_balanced_pred)
balanced_precision = precision_score(y_test, xgb_balanced_pred)
balanced_recall = recall_score(y_test, xgb_balanced_pred)

print("\nBalanced XGBoost Performance:")
print("Accuracy:", balanced_accuracy)
print("Precision:", balanced_precision)
print("Recall:", balanced_recall)

# Get balanced XGBoost probability of default
xgb_balanced_prob = xgb_balanced_model.predict_proba(X_test_processed)[:, 1]

print("\nFirst 10 balanced XGBoost default probabilities:")
print(xgb_balanced_prob[:10])

# Calculate balanced XGBoost ROC-AUC
balanced_roc_auc = roc_auc_score(y_test, xgb_balanced_prob)

print("\nBalanced XGBoost ROC-AUC:", balanced_roc_auc)

# Confusion matrix for balanced XGBoost
balanced_cm = confusion_matrix(y_test, xgb_balanced_pred)

print("\nBalanced XGBoost Confusion Matrix:")
print(balanced_cm)
# Create a SHAP explainer for the balanced XGBoost model
explainer = shap.TreeExplainer(xgb_balanced_model)

print("\nSHAP explainer created!")

# Calculate SHAP values for the test data
shap_values = explainer.shap_values(X_test_processed)

print("\nSHAP values calculated!")
print("SHAP values shape:", shap_values.shape)

# View SHAP values for the first test customer
print("\nSHAP values for first test customer:")
print(shap_values[0])

# Match feature names with SHAP values
shap_first_customer = pd.DataFrame({
    "Feature": feature_names,
    "SHAP Value": shap_values[0]
})

print("\nSHAP explanation for the first test customer:")
print(shap_first_customer)

# Calculate overall SHAP feature importance
mean_abs_shap = abs(shap_values).mean(axis=0)
shap_importance = pd.DataFrame({
    "Feature": feature_names,
    "Mean Absolute SHAP": mean_abs_shap
})

shap_importance = shap_importance.sort_values(
    by="Mean Absolute SHAP",
    ascending = False
)
print("\nTop 10 most important features:")
print(shap_importance.head(10))

# Plot top 10 SHAP feature importance
top_features = shap_importance.head(10).sort_values(
    by = "Mean Absolute SHAP"
)
plt.figure(figsize=(10,6))

plt.barh(
    top_features["Feature"],
    top_features["Mean Absolute SHAP"]
)

plt.xlabel("Mean Absolute SHAP Values")
plt.ylabel("Feature")
plt.title("Top 10 Features y SHAP Importance")

plt.tight_layout()
plt.show()

# Save the trained XGBoost model 
joblib.dump(
    xgb_balanced_model,
    "models/loan_model.pkl"
)
print("XGBoost model saved successfully!")

# Save the preprocessing pipeline
joblib.dump(
    preprocessor,
    "models/preprocessing.pkl"
)

print("Preprocessing pipeline saved successfully!")