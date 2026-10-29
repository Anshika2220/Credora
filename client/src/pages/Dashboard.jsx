
import "./Dashboard.css";

const metrics = [
  {
    label: "ML Model",
    value: "XGBoost",
    detail: "Credit risk classification model",
    symbol: "✳",
  },
  {
    label: "Model ROC-AUC",
    value: "0.7766",
    detail: "Performance on held-out test data",
    symbol: "↗",
  },
  {
    label: "Evaluation Records",
    value: "6,000",
    detail: "Customers in the original test split",
    symbol: "▤",
  },
];

function EmptyChart({ icon, title, description }) {
  return (
    <div className="chart-empty">
      <div className="chart-empty-icon" aria-hidden="true">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <section className="content-page analytics-page">
      <div className="analytics-heading">
        <div>
          <p className="eyebrow">CREDORA ANALYTICS</p>
          <h2 className="analytics-title">Credit Risk Intelligence</h2>
          <p className="page-description">
            Understand customer credit risk, identify accounts that may
            need closer review, and monitor changes across assessed data.
          </p>
        </div>

        <span className="model-status">
          <span className="status-dot" />
          Model overview
        </span>
      </div>

      {/* Model performance */}
      <div className="analytics-metrics">
        {metrics.map((metric) => (
          <article className="analytics-metric-card" key={metric.label}>
            <div className="metric-card-top">
              <span>{metric.label}</span>
              <span className="metric-symbol" aria-hidden="true">
                {metric.symbol}
              </span>
            </div>

            <h3>{metric.value}</h3>
            <p>{metric.detail}</p>
          </article>
        ))}
      </div>

      {/* Main customer insights */}
      <div className="analytics-chart-grid">
        <article className="analytics-chart-card">
          <div className="chart-card-heading">
            <div>
              <h3>Customer Risk Breakdown</h3>
              <p>
                Customers predicted as default risk versus non-default risk
              </p>
            </div>

            <span className="chart-type-label">DONUT</span>
          </div>

          <EmptyChart
            icon="◔"
            title="Ready to assess your customer data"
            description="Upload a customer dataset and run predictions to see the number and percentage of customers in each predicted risk category."
          />

          <div className="chart-card-footer">
            <span>Customer risk assessment</span>
            <span>Awaiting data</span>
          </div>
        </article>

        <article className="analytics-chart-card">
          <div className="chart-card-heading">
            <div>
              <h3>Default Risk Monitoring</h3>
              <p>Changes in predicted default rates across assessment dates</p>
            </div>

            <span className="chart-type-label">TREND</span>
          </div>

          <EmptyChart
            icon="⌁"
            title="Monitor risk over time"
            description="As dated prediction batches become available, this chart can help identify whether predicted default rates are rising or falling."
          />

          <div className="chart-card-footer">
            <span>Risk monitoring history</span>
            <span>Awaiting data</span>
          </div>
        </article>
      </div>

      {/* Bank-focused operational insights */}
      <div className="analytics-chart-grid">
        <article className="analytics-chart-card">
          <div className="chart-card-heading">
            <div>
              <h3>Customers Requiring Review</h3>
              <p>
                Find predicted higher-risk cases for further assessment
              </p>
            </div>

            <span className="chart-type-label">REVIEW</span>
          </div>

          <EmptyChart
            icon="◎"
            title="No customer assessments yet"
            description="After predictions are run, this section can summarize higher-risk cases for a qualified reviewer to examine."
          />

          <div className="chart-card-footer">
            <span>Human review support</span>
            <span>Awaiting data</span>
          </div>
        </article>

        <article className="analytics-chart-card">
          <div className="chart-card-heading">
            <div>
              <h3>Recent Risk Assessments</h3>
              <p>Keep track of customer datasets assessed by Credora</p>
            </div>

            <span className="chart-type-label">ACTIVITY</span>
          </div>

          <EmptyChart
            icon="▤"
            title="Your assessment history will appear here"
            description="Once prediction batches are saved, this section can show assessment dates, record counts, and links to review or export results."
          />

          <div className="chart-card-footer">
            <span>Assessment history</span>
            <span>Awaiting data</span>
          </div>
        </article>
      </div>

      <div className="analytics-note">
        <span className="note-icon" aria-hidden="true">
          i
        </span>
        <p>
          <strong>About these insights:</strong> Model ROC-AUC and evaluation
          records describe the original test dataset, not current bank
          customers. Customer charts and review summaries will reflect real
          prediction records once those records are connected. Predictions
          are estimates and should support, not replace, human review.
        </p>
      </div>
    </section>
  );
}

export default Dashboard;
