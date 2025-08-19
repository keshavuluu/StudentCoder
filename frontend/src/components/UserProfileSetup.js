import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import "./UserProfileSetup.css";
import UserProfileDropdown from "./UserProfileDropdown";

const UserProfileSetup = ({ user, isSignedIn, onNavigate, onLogout }) => {
  const [formData, setFormData] = useState({
    codechef: "",
    leetcode: "",
    gfg: "",
    interviewbit: "",
    codeforces: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const userData = {
      email: user.emailAddresses[0].emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      platformUsernames: formData,
    };

    console.log("Submitting user profile data:", userData);

    try {
      const response = await axiosInstance.post("/user-profiles", userData);
      console.log("Profile setup response:", response.data);

      if (response.data.success) {
        setMessage(
          "Profile setup successful! You can now view the leaderboard."
        );
        setTimeout(() => {
          onNavigate("leaderboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error setting up profile:", error);
      setMessage(
        error.response?.data?.message ||
          "Error setting up profile. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-setup-container">
      <UserProfileDropdown
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="setup-content">
        <div className="setup-header">
          <h1>Welcome to Student Resources!</h1>
          <p>
            Please provide your coding platform usernames to get started with
            the leaderboard.
          </p>
        </div>

        <div className="setup-form-container">
          <form onSubmit={handleSubmit} className="setup-form">
            <div className="form-group">
              <label htmlFor="codechef">
                <span className="platform-icon">🍽️</span>
                CodeChef Username
              </label>
              <input
                type="text"
                id="codechef"
                name="codechef"
                value={formData.codechef}
                onChange={handleInputChange}
                placeholder="Enter your CodeChef username"
                required
              />
              <small>Your CodeChef profile username (e.g., keshavulu03)</small>
            </div>

            <div className="form-group">
              <label htmlFor="leetcode">
                <span className="platform-icon">💻</span>
                LeetCode Username
              </label>
              <input
                type="text"
                id="leetcode"
                name="leetcode"
                value={formData.leetcode}
                onChange={handleInputChange}
                placeholder="Enter your LeetCode username"
                required
              />
              <small>Your LeetCode profile username</small>
            </div>

            <div className="form-group">
              <label htmlFor="gfg">
                <span className="platform-icon">📚</span>
                GeeksforGeeks Username
              </label>
              <input
                type="text"
                id="gfg"
                name="gfg"
                value={formData.gfg}
                onChange={handleInputChange}
                placeholder="Enter your GFG username"
                required
              />
              <small>Your GeeksforGeeks profile username</small>
            </div>

            <div className="form-group">
              <label htmlFor="interviewbit">
                <span className="platform-icon">🎯</span>
                InterviewBit Username
              </label>
              <input
                type="text"
                id="interviewbit"
                name="interviewbit"
                value={formData.interviewbit}
                onChange={handleInputChange}
                placeholder="Enter your InterviewBit username"
                required
              />
              <small>Your InterviewBit profile username</small>
            </div>

            <div className="form-group">
              <label htmlFor="codeforces">
                <span className="platform-icon">🏆</span>
                Codeforces Username
              </label>
              <input
                type="text"
                id="codeforces"
                name="codeforces"
                value={formData.codeforces}
                onChange={handleInputChange}
                placeholder="Enter your Codeforces username"
                required
              />
              <small>Your Codeforces profile username</small>
            </div>

            {message && (
              <div
                className={`message ${
                  message.includes("Error") ? "error" : "success"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Setting up..." : "Complete Setup"}
            </button>
          </form>

          <div className="setup-info">
            <h3>Why do we need your usernames?</h3>
            <ul>
              <li>Track your coding progress across platforms</li>
              <li>Compare your performance with peers</li>
              <li>Get ranked on the leaderboard</li>
              <li>Monitor your problem-solving journey</li>
            </ul>

            <div className="platform-links">
              <h4>Platform Links:</h4>
              <div className="links-grid">
                <a
                  href="https://www.codechef.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CodeChef
                </a>
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LeetCode
                </a>
                <a
                  href="https://practice.geeksforgeeks.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GeeksforGeeks
                </a>
                <a
                  href="https://www.interviewbit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  InterviewBit
                </a>
                <a
                  href="https://codeforces.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Codeforces
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSetup;
