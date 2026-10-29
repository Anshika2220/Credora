
function Home() {
  return (
    <section className="home-page">
      <p className="eyebrow">INTELLIGENT CREDIT RISK ANALYSIS</p>

      <h1>
        Smarter insights.
        <br />
        <span>Better risk decisions.</span>
      </h1>

      <p className="hero-description">
        Explore a machine learning system that analyzes financial and
        repayment information to estimate loan default risk.
      </p>

      <a className="primary-link" href="/prediction">
        Start a Prediction →
      </a>

      <div className="feature-grid">
        <article className="feature-card">
          <span className="feature-number">01</span>
          <h3>Risk Prediction</h3>
          <p>Estimate the probability of loan default from applicant data.</p>
        </article>

        <article className="feature-card">
          <span className="feature-number">02</span>
          <h3>Explainable AI</h3>
          <p>Explore feature contributions using SHAP explanations.</p>
        </article>

        <article className="feature-card">
          <span className="feature-number">03</span>
          <h3>Model Insights</h3>
          <p>Understand model behavior through analytics and visualizations.</p>
        </article>
      </div>

      <p className="disclaimer">
        Educational demonstration only. Predictions are estimates, not
        lending decisions.
      </p>
    </section>
  );
}

export default Home;
