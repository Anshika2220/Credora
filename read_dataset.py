import pandas as pd

# Load the Excel dataset
df = pd.read_excel(
    "data/default of credit card clients.xls",
    header=1
)

# Display the first 5 rows
print(df.head())

print(df.columns.tolist())
print("Dataset Shape: " , df.shape)
print("\nDataset Information")
print(df.info())
print("\nMissing Values")
print(df.isnull().sum())


pay_columns = ["PAY_0", "PAY_2", "PAY_3", "PAY_4", "PAY_5", "PAY_6"]
print("\nUnique values in repayment status columns:")
for column in pay_columns:
    print(f"{column}:")
    print(sorted(df[column].unique().tolist()))

print("\nTarget distibution:")
print(df["default payment next month"].value_counts())

print("\nbasic statistics:")
print(df.describe())

print("\nUnique values:")
print("SEX:", df["SEX"].unique())
print("EDUCATION:", df["EDUCATION"].unique())
print("MARRIAGE:", df["MARRIAGE"].unique())
print("PAY_0:", df["PAY_0"].unique())


print("PAY_2:", df["PAY_2"].unique())
print("PAY_3:", df["PAY_3"].unique())
print("PAY_4:", df["PAY_4"].unique())
print("PAY_5:", df["PAY_5"].unique())
print("PAY_6:", df["PAY_6"].unique())

print("\nSeparating features and target:")

X = df.drop(columns=["ID", "default payment next month"])
y = df["default payment next month"]

print("X shape:", X.shape)
print("y shape:", y.shape)

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nAfter train-test split:")
print("X_train shape:" , X_train.shape)
print("X_test shape:" , X_test.shape)
print("y_train shape:" , y_train.shape)
print("y_test shape:" , y_test.shape)

# Feature groups

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

print("\nFeature groups:")
print("Numerical:", len(numerical_features))
print("Categorical:", len(categorical_features))
print("Repayment:", len(repayment_features))