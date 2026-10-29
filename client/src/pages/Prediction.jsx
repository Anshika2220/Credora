
import { useState } from "react";

const initialDetails = {
  LIMIT_BAL: 200000,
  SEX: 2,
  EDUCATION: 2,
  MARRIAGE: 1,
  AGE: 35,
  PAY_0: 0,
  PAY_2: 0,
  PAY_3: 0,
  PAY_4: 0,
  PAY_5: 0,
  PAY_6: 0,
  BILL_AMT1: 50000,
  BILL_AMT2: 48000,
  BILL_AMT3: 45000,
  BILL_AMT4: 43000,
  BILL_AMT5: 40000,
  BILL_AMT6: 38000,
  PAY_AMT1: 2000,
  PAY_AMT2: 2000,
  PAY_AMT3: 2000,
  PAY_AMT4: 2000,
  PAY_AMT5: 2000,
  PAY_AMT6: 2000,
};

const fields = [
  {
    title: "Applicant Profile",
    description: "Basic demographic and credit information.",
    keys: ["AGE", "LIMIT_BAL", "SEX", "EDUCATION", "MARRIAGE"],
  },
  {
    title: "Repayment History",
    description: "Repayment status across recent months.",
    keys: ["PAY_0", "PAY_2", "PAY_3", "PAY_4", "PAY_5", "PAY_6"],
  },
  {
    title: "Financial History",
    description: "Recent bills and payments, in New Taiwan dollars (NT$).",
    keys: [
      "BILL_AMT1", "PAY_AMT1",
      "BILL_AMT2", "PAY_AMT2",
      "BILL_AMT3", "PAY_AMT3",
      "BILL_AMT4", "PAY_AMT4",
      "BILL_AMT5", "PAY_AMT5",
      "BILL_AMT6", "PAY_AMT6",
    ],
  },
];

const labels = {
  AGE: "Applicant age",
  LIMIT_BAL: "Credit limit (NT$)",
  SEX: "Gender category (dataset code)",
  EDUCATION: "Education category (dataset code)",
  MARRIAGE: "Marital status category (dataset code)",
  PAY_0: "Most recent repayment status",
  PAY_2: "Previous repayment status (2)",
  PAY_3: "Previous repayment status (3)",
  PAY_4: "Previous repayment status (4)",
  PAY_5: "Previous repayment status (5)",
  PAY_6: "Previous repayment status (6)",
  BILL_AMT1: "Most recent bill (NT$)",
  BILL_AMT2: "Previous bill (2) (NT$)",
  BILL_AMT3: "Previous bill (3) (NT$)",
  BILL_AMT4: "Previous bill (4) (NT$)",
  BILL_AMT5: "Previous bill (5) (NT$)",
  BILL_AMT6: "Previous bill (6) (NT$)",
  PAY_AMT1: "Most recent payment (NT$)",
  PAY_AMT2: "Previous payment (2) (NT$)",
  PAY_AMT3: "Previous payment (3) (NT$)",
  PAY_AMT4: "Previous payment (4) (NT$)",
  PAY_AMT5: "Previous payment (5) (NT$)",
  PAY_AMT6: "Previous payment (6) (NT$)",
};

function Prediction() {
  const [details, setDetails] = useState(initialDetails);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setDetails((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(details).map(([key, value]) => [key, Number(value)])
          )
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction request failed.");
      }

      setResult(data);
    } catch {
      setError("Could not get a prediction. Check that both backend servers are running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="content-page">
      <p className="eyebrow">MODEL ANALYSIS</p>
      <h1>Loan Prediction</h1>
      <p className="page-description">
        Enter the sample information below to estimate default risk.
        The prefilled values are for testing, not a real applicant.
      </p>

      <form onSubmit={handleSubmit}>
        {fields.map((section) => (
          <div className="form-section" key={section.title}>
            <h2>{section.title}</h2>
            <p className="section-description">{section.description}</p>

            <div className="input-grid">
              {section.keys.map((key) => (
                <label className="field" key={key}>
                  <span>{labels[key]}</span>
                  <input
                    type="number"
                    name={key}
                    value={details[key]}
                    onChange={handleChange}
                    min={key === "AGE" ? 18 : undefined}
                    required
                  />
                </label>
              ))}
            </div>
          </div>
        ))}

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Predict Default Risk"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <section className="result-card">
          <p className="eyebrow">PREDICTION RESULT</p>
          <h2>
            {result.prediction === 1
              ? "Default predicted"
              : "No default predicted"}
          </h2>
          <p>
            Estimated default probability:{" "}
            <strong>
              {(result.default_probability * 100).toFixed(2)}%
            </strong>
          </p>

          <h3>Top contributing features</h3>
          <ul className="shap-list">
            {[...(result.shap_explanation || [])]
              .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
              .slice(0, 10)
              .map((item) => (
                <li key={item.feature}>
                  <span>{item.feature}</span>
                  <strong>{item.impact.toFixed(3)}</strong>
                </li>
              ))}
          </ul>
        </section>
      )}
    </section>
  );
}

export default Prediction;
