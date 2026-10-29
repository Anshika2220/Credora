# Credora
Credora is an ML-powered credit risk analysis platform designed to help financial institutions predict loan default risk through batch data processing , risk analytics, and explanaible AI . Built with Python ,FastAPI , React , Nodejs, and machine learning, the project aims to simplify credit risk assessment and support data driven lending decisions

# Credora — Intelligent Credit Risk Analysis Platform

Credora is a machine learning-powered credit risk analysis platform designed to help financial institutions assess loan default risk through batch predictions, risk analytics, and explainable AI.

The project combines machine learning with a modern full-stack dashboard to make credit risk assessment more efficient, interpretable, and data-driven.

> **Project Status:** Under active development 🚧

## 🎯 Project Vision

Credora aims to provide banks and financial institutions with a centralized platform to analyze borrower data at scale, identify potential credit risks, and understand the factors influencing model predictions.

The long-term goal is to build a scalable credit risk analytics solution featuring bulk data processing, interactive dashboards, model explainability, and historical analysis.

## ✨ Key Features

- **Loan Default Prediction:** Machine learning models to estimate the likelihood of loan default.
- **Batch Prediction API:** Process borrower data through a prediction endpoint.
- **Explainable AI:** SHAP-based explanations to understand the factors influencing individual predictions.
- **Interactive Dashboard:** A centralized interface for exploring credit risk insights.
- **Risk Analytics:** Planned visualizations and risk segmentation for portfolio-level analysis.
- **Bulk Data Processing:** Planned CSV/Excel uploads, validation, and batch prediction workflows.
- **Prediction History:** Planned storage and retrieval of previous analysis results.

*Features marked as planned are still under development.*

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend API | Python, FastAPI |
| Server | Node.js, Express.js |
| Machine Learning | Scikit-learn, XGBoost |
| Explainable AI | SHAP |
| Data Processing | Pandas, NumPy |
| Database | MongoDB integration planned |

## 🧠 Machine Learning

Credora uses the **UCI Default of Credit Card Clients** dataset to develop and evaluate loan default prediction models.

The current ML workflow includes:

- Data preprocessing and feature preparation
- Logistic Regression and XGBoost models
- Class-imbalance handling
- Model evaluation using ROC-AUC
- SHAP-based feature explanations

The current XGBoost model has achieved a test ROC-AUC of approximately **0.7766** on a 6,000-sample test set. This is an experimental result, not a guarantee of real-world lending performance.

## 🏗️ Project Architecture

```text
Credora/
├── client/          # React + Vite frontend
├── server/          # Express backend
├── models/          # Saved ML model artifacts
├── main.py          # FastAPI prediction service
├── database.py      # Database-related logic
├── read_dataset.py  # Dataset exploration
├── .gitignore
└── README.md
```

The frontend communicates with the Express server, which forwards prediction requests to the FastAPI machine learning service.

## 🚀 Getting Started

### Prerequisites

- Python 3.13 or a compatible Python version
- Node.js and npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Anshika2220/Credora.git
cd Credora
```

### 2. Set up the Python environment

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install the Python dependencies listed in the project's dependency file. If a `requirements.txt` is available:

```bash
pip install -r requirements.txt
```

### 3. Start the FastAPI service

```bash
uvicorn main:app --reload
```

The API documentation is available at:

`http://127.0.0.1:8000/docs`

### 4. Start the Express server

Open a separate terminal:

```bash
cd server
npm install
npm start
```

Use the start script configured in `server/package.json`. If your project uses a different script, run the corresponding command.

### 5. Start the frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

*Setup commands may need adjustment as the project evolves. Ensure the saved model files and required environment variables are configured before running the services.*

## 📊 Dataset

The project uses the UCI Default of Credit Card Clients dataset for experimentation and model development.

The dataset contains historical credit and repayment information and a target indicating whether a client defaulted on payment in the following month.

Dataset source: [UCI Machine Learning Repository](https://archive.ics.uci.edu/dataset/350/default+of+credit+card+clients)

## 🗺️ Roadmap

- [x] Develop the initial machine learning pipeline
- [x] Train and evaluate baseline and XGBoost models
- [x] Integrate SHAP explanations
- [x] Build the FastAPI prediction endpoint
- [x] Connect the Express prediction route
- [ ] Complete bulk CSV/Excel upload and validation
- [ ] Build portfolio-level risk analytics
