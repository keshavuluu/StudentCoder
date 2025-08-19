import React, { useState, useRef, useEffect } from "react";
import { SignInButton } from "@clerk/clerk-react";
import "./UserProfileDropdown.css";

const menuOptions = [
  { label: "Roadmap", icon: "🗺️", page: "roadmap" },
  { label: "Leaderboard", icon: "🏆", page: "leaderboard" },
  { label: "Hackathons", icon: "🎯", page: "hackathons" },
  { label: "DSA Sheets", icon: "📚", page: "dsa" },
  { label: "Apply Internships", icon: "💼", page: "internships" },
  { label: "Home", icon: "🏠", page: "home" },
];

const UserProfileDropdown = ({
  user,
  isSignedIn,
  onNavigate,
  onLogout,
  useClerk = false,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Log authentication mode and props
  useEffect(() => {
    console.log(
      "🔐 UserProfileDropdown - Authentication mode:",
      useClerk ? "Clerk" : "Development"
    );
    console.log("🔍 UserProfileDropdown - Props:", { useClerk, isSignedIn });
    console.log(
      "🔍 UserProfileDropdown - Will render:",
      useClerk ? "Clerk SignIn Button" : "Development Login"
    );
  }, [useClerk, isSignedIn]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleMenuClick = (option) => {
    setOpen(false);
    if (option.isLogout) {
      if (onLogout) onLogout();
    } else if (onNavigate && option.page) {
      onNavigate(option.page);
    }
  };

  return (
    <div className="user-profile-dropdown-wrapper" ref={dropdownRef}>
      <div
        className="user-profile-trigger"
        onClick={() => setOpen((prev) => !prev)}
        tabIndex={0}
      >
        <div className="user-avatar">
          {isSignedIn && user && user.firstName
            ? user.firstName[0].toUpperCase()
            : "👤"}
        </div>
        <span className="user-name">
          {isSignedIn && user ? user.firstName || "User" : "Guest"}
        </span>
        <span className="dropdown-arrow">▼</span>
      </div>
      {open && (
        <div className="user-profile-dropdown-card">
          {isSignedIn ? (
            <>
              {menuOptions.map((option) => (
                <div
                  className="dropdown-item"
                  key={option.label}
                  onClick={() => handleMenuClick(option)}
                >
                  <span className="dropdown-icon">{option.icon}</span>
                  {option.label}
                </div>
              ))}
              <div
                className="dropdown-item logout"
                onClick={() => handleMenuClick({ isLogout: true })}
              >
                <span className="dropdown-icon">⏏️</span>
                Logout
              </div>
            </>
          ) : // Force Clerk mode if we detect Clerk is available
          useClerk || window.Clerk ? (
            <SignInButton mode="modal">
              <div className="dropdown-item">
                <span className="dropdown-icon">🔐</span>
                Login
              </div>
            </SignInButton>
          ) : (
            <div
              className="dropdown-item"
              onClick={() => {
                console.log("🟡 Development login clicked");
                const email = prompt(
                  "Enter email for test login (or press OK for default):"
                );
                if (email !== null) {
                  const testEmail = email.trim() || "testuser@example.com";
                  console.log(
                    "🟡 Attempting to call simulateLogin with:",
                    testEmail
                  );
                  if (window.simulateLogin) {
                    window.simulateLogin(testEmail);
                  } else {
                    console.error("❌ window.simulateLogin not available");
                  }
                }
                setOpen(false);
              }}
            >
              <span className="dropdown-icon">🔐</span>
              Login (Development Mode)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
