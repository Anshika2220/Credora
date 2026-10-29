
import { useState } from "react";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Prediction from "./pages/Prediction";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

import "./App.css";

const navigation = [
  { label: "Overview", path: "/", icon: "▦", end: true },
  { label: "Upload Data", path: "/prediction", icon: "⇧" },
  { label: "Analytics", path: "/dashboard", icon: "▥" },
  { label: "About Credora", path: "/about", icon: "ⓘ" },
];

const pageTitles = {
  "/": {
    title: "Overview",
    description: "Your credit risk intelligence workspace",
  },
  "/prediction": {
    title: "Upload Data",
    description: "Prepare customer data for risk analysis",
  },
  "/dashboard": {
    title: "Analytics Overview",
    description: "Explore model performance and prediction insights",
  },
  "/about": {
    title: "About Credora",
    description: "Understand the platform and its capabilities",
  },
};

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const page = pageTitles[location.pathname] ?? {
    title: "Credora",
    description: "Intelligent credit decisions",
  };

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <NavLink
          to="/"
          className="brand"
          onClick={() => setSidebarOpen(false)}
          aria-label="Credora home"
        >
          <span className="brand-icon" aria-hidden="true">
            C
          </span>

          <span className="brand-copy">
            <strong>Credora</strong>
            <small>Credit Risk Intelligence</small>
          </span>
        </NavLink>

        <div className="sidebar-section-label">WORKSPACE</div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-icon" aria-hidden="true">
                {item.icon}
              </span>

              <span>{item.label}</span>

              {item.path === "/prediction" && (
                <span className="nav-arrow" aria-hidden="true">
                  ↗
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-status">
            <span className="status-dot" />

            <div>
              <strong>Workspace ready</strong>
              <small>Local development</small>
            </div>
          </div>

          <p className="sidebar-version">CREDORA · DEVELOPMENT</p>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <div className="topbar-heading">
            <button
              className="menu-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((open) => !open)}
            >
              ☰
            </button>

            <div>
              <h1>{page.title}</h1>
              <p>{page.description}</p>
            </div>
          </div>

          <div className="topbar-actions">
            <span className="environment-label">
              <span className="status-dot" />
              Development
            </span>

            <div
              className="user-avatar"
              title="Credora brand mark"
              aria-label="Credora logo mark"
            >
              C
            </div>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <span>Credora · Credit Risk Intelligence</span>
          <span>Intelligent credit decisions</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
