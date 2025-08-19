import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./firstpage.css";
import UserProfileDropdown from "./components/UserProfileDropdown";

const FirstPage = ({ onNavigate, onLogout, user, isSignedIn, isLoaded }) => {




  // Don't render anything until Clerk is loaded
  if (!isLoaded) {
    return <div className="first-page">Loading...</div>;
  }

  return (
    <div className="first-page">
      <UserProfileDropdown
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <div className="main-content">
        <div className="welcome-section">
          <h1>Welcome to Student Resources</h1>
          <p>
            Choose what you want to explore using the menu at the top right.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FirstPage;
