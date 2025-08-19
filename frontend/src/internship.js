import React from "react";
import "./firstpage.css";
import UserProfileDropdown from "./components/UserProfileDropdown";

const InternshipPage = ({ user, isSignedIn, onNavigate, onLogout }) => {
  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="internship-page">
      <UserProfileDropdown
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <div className="welcome-section">
        <h1>Apply for Internships</h1>
        <p>Choose a platform to explore opportunities:</p>
      </div>
      <div className="navigation-buttons">
        <button
          className="nav-button internshala"
          onClick={() => handleRedirect("https://internshala.com/")}
        >
          <h2>Internshala</h2>
          <p>Internship and online training platform</p>
        </button>
        <button
          className="nav-button naukri"
          onClick={() => handleRedirect("https://www.naukri.com/")}
        >
          <h2>Naukri</h2>
          <p>Indian job portal for job seekers</p>
        </button>
        <button
          className="nav-button linkedin"
          onClick={() => handleRedirect("https://www.linkedin.com/jobs/")}
        >
          <h2>LinkedIn</h2>
          <p>Professional networking and job search</p>
        </button>
      </div>
    </div>
  );
};

export default InternshipPage;
