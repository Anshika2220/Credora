
function About() {
  const technologies = [
    {
      name: "React",
      description: "Frontend interface and user interaction",
    },
    {
      name: "Node.js + Express",
      description: "Backend API and communication layer",
    },
    {
      name: "FastAPI",
      description: "Serves the machine learning model",
    },
    {
      name: "Python + XGBoost",
      description: "Credit-risk classification and prediction",
    },
    {
      name: "SHAP",
      description: "Explains feature contributions to predictions",
    },
  ];

  return (
    <section className="content-page">
      <p className="eyebrow">ABOUT THE PROJECT</p>

      <h1>Making credit risk easier to understand.</h1>

      <p className="page-description">
        CrediScope is an educational machine learning application
        that estimates loan default risk from financial and
        repayment information. It also provides explanations
        to help users understand the factors influencing a prediction.
      </p>

      <section className="form-section">
        <h2>Project objective</h2>
        <p>
          The goal is to combine machine learning with a web
          application to demonstrate how financial data can be
          processed, analyzed, and used to estimate default risk.
          SHAP explanations provide additional insight into the
          model's predictions.
        </p>
      </section>

      <section className="form-section">
        <h2>Technology stack</h2>

        <div className="technology-grid">
          {technologies.map((technology) => (
            <article className="feature-card" key={technology.name}>
              <h3>{technology.name}</h3>
              <p>{technology.description}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="disclaimer">
        CrediScope is a student project for educational purposes.
        Its predictions should not be used as the sole basis for
        real lending or financial decisions.
      </p>
    </section>
  );
}

export default About;
