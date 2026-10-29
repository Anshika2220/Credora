import joblib
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import shap


app = FastAPI()

# Load the preprocessing pipeline
preprocessor = joblib.load("models/preprocessing.pkl")
model = joblib.load("models/loan_model.pkl")

# Create the SHAP explainer for the trained XGBoost model
explainer = shap.TreeExplainer(model) 

# Get the feature names afer preprocessing
feature_names = preprocessor.get_feature_names_out()

# User-friendly names for SHAP features
feature_name_mapping = {
    "num__LIMIT_BAL": "Credit Limit",
    "num__AGE": "Age",
    "num__BILL_AMT1": "Most Recent Bill Amount",
    "num__PAY_AMT1": "Most Recent Payment Amount",
    "repay__PAY_0": "Most Recent Repayment Status",
    "num__BILL_AMT2": "Previous Bill Amount (2)",
    "num__BILL_AMT3": "Previous Bill Amount (3)",
    "num__BILL_AMT4": "Previous Bill Amount (4)",
    "num__BILL_AMT5": "Previous Bill Amount (5)",
    "num__BILL_AMT6": "Previous Bill Amount (6)",
    "num__PAY_AMT2": "Previous Payment Amount (2)",
    "num__PAY_AMT3": "Previous Payment Amount (3)",
    "num__PAY_AMT4": "Previous Payment Amount (4)",
    "num__PAY_AMT5": "Previous Payment Amount (5)",
    "num__PAY_AMT6": "Previous Payment Amount (6)",
    "cat__SEX_1": "Gender Category 1",
    "cat__SEX_2": "Gender Category 2",
    "cat__EDUCATION_0": "Education Category 0",
    "cat__EDUCATION_1": "Education Category 1",
    "cat__EDUCATION_2": "Education Category 2",
    "cat__EDUCATION_3": "Education Category 3",
    "cat__EDUCATION_4": "Education Category 4",
    "cat__EDUCATION_5": "Education Category 5",
    "cat__EDUCATION_6": "Education Category 6",
    "cat__MARRIAGE_0": "Marriage Category 0",
    "cat__MARRIAGE_1": "Marriage Category 1",
    "cat__MARRIAGE_2": "Marriage Category 2",
    "cat__MARRIAGE_3": "Marriage Category 3",
    "repay__PAY_0": "Most Recent Repayment Status",
    "repay__PAY_2": "Previous Repayment Status (2)",
    "repay__PAY_3": "Previous Repayment Status (3)",
    "repay__PAY_4": "Previous Repayment Status (4)",
    "repay__PAY_5": "Previous Repayment Status (5)",
    "repay__PAY_6": "Previous Repayment Status (6)"
}

class LoanData(BaseModel):
    LIMIT_BAL: float
    SEX: int
    EDUCATION: int
    MARRIAGE: int
    AGE: int

    PAY_0: int
    PAY_2: int
    PAY_3: int
    PAY_4: int
    PAY_5: int
    PAY_6: int

    BILL_AMT1: float
    BILL_AMT2: float
    BILL_AMT3: float
    BILL_AMT4: float
    BILL_AMT5: float
    BILL_AMT6: float

    PAY_AMT1: float
    PAY_AMT2: float
    PAY_AMT3: float
    PAY_AMT4: float
    PAY_AMT5: float
    PAY_AMT6: float


@app.get("/")
def home():
    return {"message" : "Loan Default Prediction API is running !"}


@app.post("/predict")
def predict(data: LoanData):

    # Convert the incoming Pydantic data into a dictionary
    input_data = data.model_dump()

    # Convert the dictionary into pandas DataFrame
    input_df = pd.DataFrame([input_data])

    # Apply the same preprocessing used during training
    processed_data = preprocessor.transform(input_df)

    # Make the prediction
    prediction = model.predict(processed_data)

    # get the probabilty of default
    probability = model.predict_proba(processed_data)[0][1]

    # Calculate SHAP values for this customer 
    shap_values = explainer.shap_values(processed_data)[0]

    shap_explanation = [
        {
            "feature": feature_name_mapping.get(
                feature_names[i],
                feature_names[i]
            ),
            "impact" : float(shap_values[i])
        }
        for i in range(len(feature_names))
    ]

    return {
    "prediction": int(prediction[0]),
    "default_probability": float(probability),
    "shap_explanation": shap_explanation
}