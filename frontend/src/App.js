import React, { useState, useEffect, useRef, useCallback } from "react";
import { axiosInstance } from "./lib/axios";
import HackathonForm from "./components/HackathonForm";
import HackathonList from "./components/HackathonList";
import DSASheets from "./components/DSASheets";
import FirstPage from "./firstpage";
import InternshipPage from "./internship";
import First from "./RoadMap/First";
import UserProfileDropdown from "./components/UserProfileDropdown";
import Leaderboard from "./components/Leaderboard";
import UserProfileSetup from "./components/UserProfileSetup";
import "./App.css";

const COLOR_PALETTE = [
  "#00bcd4",
  "#4caf50",
  "#e91e63",
  "#ffeb3b",
  "#ff9800",
  "#3f51b5",
  "#f44336",
  "#8bc34a",
  "#9c27b0",
  "#00bfae",
];

function App({ useClerk = false, clerkAuth = null, clerkAuthObj = null }) {
  const [hackathons, setHackathons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [textColor] = useState(COLOR_PALETTE[0]);
  const [showPalette, setShowPalette] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  const paletteRef = useRef(null);

  const [fallbackIsSignedIn, setFallbackIsSignedIn] = useState(false);
  const [fallbackUser, setFallbackUser] = useState(null);

  const clerkReady = useClerk && clerkAuth?.isLoaded;
  const isSignedIn = clerkReady
    ? clerkAuth?.isSignedIn || false
    : fallbackIsSignedIn;
  const user = clerkReady ? clerkAuth?.user : fallbackUser;
  const isLoaded = useClerk ? clerkAuth?.isLoaded !== false : true;

  console.log("🔍 Auth Debug:", {
    useClerk,
    clerkReady,
    clerkIsLoaded: clerkAuth?.isLoaded,
    clerkIsSignedIn: clerkAuth?.isSignedIn,
    finalIsSignedIn: isSignedIn,
  });
  useEffect(() => {
    if (isLoaded) {
      console.log(
        "👤 User authentication status:",
        isSignedIn ? "Signed in" : "Not signed in"
      );
    }
  }, [isSignedIn, isLoaded]);

  const signOut = () => {
    if (useClerk && clerkAuthObj?.signOut) {
      clerkAuthObj.signOut();
    } else {
      setFallbackIsSignedIn(false);
      setFallbackUser(null);
    }
  };

  const simulateLogin = useCallback(
    (email) => {
      console.log("🔐 SIMULATE LOGIN called with email:", email);

      if (!clerkReady) {
        setFallbackIsSignedIn(true);
        setFallbackUser({
          emailAddresses: [{ emailAddress: email }],
          firstName: email.includes("new") ? "New" : "Test",
          lastName: "User",
        });
        console.log("✅ Fallback login simulation completed");
      } else {
        console.log(
          "⚠️ Clerk is ready, should use Clerk authentication instead"
        );
      }
    },
    [clerkReady, setFallbackIsSignedIn, setFallbackUser]
  );

  useEffect(() => {
    window.simulateLogin = simulateLogin;
    return () => {
      delete window.simulateLogin;
    };
  }, [simulateLogin]);

  useEffect(() => {
    if (currentPage === "hackathons") {
      fetchHackathons();
    }
  }, [currentPage]);

  useEffect(() => {
    const checkUserProfile = async () => {
      console.log(
        "🔍 PROFILE CHECK - isSignedIn:",
        isSignedIn,
        "user:",
        user ? "Available" : "Not Available",
        "isLoaded:",
        isLoaded
      );

      if (
        isLoaded &&
        isSignedIn &&
        user &&
        user.emailAddresses &&
        user.emailAddresses.length > 0
      ) {
        try {
          const email = user.emailAddresses[0].emailAddress;
          console.log("📧 Checking database for email:", email);
          const response = await axiosInstance.get(`/user-profiles/${email}`);
          console.log("📊 Database response:", response.data);

          if (!response.data.exists) {
            console.log("❌ Email NOT found in database - SHOWING SETUP FORM");
            setShowProfileSetup(true);
          } else {
            console.log("✅ Email found in database - SKIPPING SETUP FORM");
            setShowProfileSetup(false);
          }
        } catch (error) {
          console.error("❌ Error checking user profile:", error);
        }
      } else {
        console.log("⏳ Waiting for user data to load...");
        setShowProfileSetup(false);
      }
    };

    checkUserProfile();
  }, [isSignedIn, user, isLoaded]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (paletteRef.current && !paletteRef.current.contains(event.target)) {
        setShowPalette(false);
      }
    }
    if (showPalette) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPalette]);

  const fetchHackathons = async () => {
    try {
      const response = await axiosInstance.get("/hackathons");
      setHackathons(response.data);
    } catch (error) {
      console.error("Error fetching hackathons:", error);
    }
  };

  const handleHackathonAdded = (newHackathon) => {
    setHackathons((prevHackathons) => [newHackathon, ...prevHackathons]);
    setShowForm(false);
  };

  const handleDeleteHackathon = async (id) => {
    try {
      await axiosInstance.delete(`/hackathons/${id}`);
      setHackathons((prev) => prev.filter((h) => h._id !== id));
    } catch (error) {
      console.error("Error deleting hackathon:", error);
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setShowProfileSetup(false);
  };

  console.log(
    "🎯 RENDER DECISION - isSignedIn:",
    isSignedIn,
    "user:",
    user ? "Available" : "Not Available",
    "showProfileSetup:",
    showProfileSetup,
    "isLoaded:",
    isLoaded
  );

  if (
    isLoaded &&
    isSignedIn &&
    user &&
    user.emailAddresses &&
    user.emailAddresses.length > 0 &&
    showProfileSetup
  ) {
    console.log("🎨 RENDERING: UserProfileSetup component");
    return (
      <UserProfileSetup
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={handleNavigate}
        onLogout={signOut}
      />
    );
  }

  if (currentPage === "home") {
    return (
      <FirstPage
        onNavigate={handleNavigate}
        onLogout={signOut}
        user={user}
        isSignedIn={isSignedIn}
        isLoaded={isLoaded}
      />
    );
  } else if (currentPage === "internships") {
    return (
      <InternshipPage
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={handleNavigate}
        onLogout={signOut}
      />
    );
  } else if (currentPage === "roadmap") {
    return (
      <First
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={handleNavigate}
        onLogout={signOut}
      />
    );
  } else if (currentPage === "leaderboard") {
    return (
      <Leaderboard
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={handleNavigate}
        onLogout={signOut}
      />
    );
  }

  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <UserProfileDropdown
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={handleNavigate}
        onLogout={signOut}
        useClerk={useClerk}
      />
      <header className="App-header" style={{ color: textColor }}>
        <div className="header-left">
          <h1>Student Resources</h1>
        </div>
      </header>
      <main style={{ color: textColor }}>
        {currentPage === "hackathons" ? (
          <>
            <div className="intro-message">
              <p>
                Hackathons are very important for students. They help students
                understand the level of competition in the outside world, teach
                them how to improve themselves, and how to manage their time
                effectively. Hackathons also encourage teamwork,
                problem-solving, and innovation. By participating, students get
                hands-on experience, learn new technologies, and develop
                real-world solutions under pressure. It's a great way to build
                confidence, enhance communication skills, and prepare for future
                career opportunities.
              </p>
            </div>

            {/* Add Hackathon Button */}
            {!showForm && (
              <div className="add-hackathon-section">
                <button
                  className="add-hackathon-button"
                  onClick={() => setShowForm(true)}
                >
                  + Add Hackathon
                </button>
              </div>
            )}

            {showForm && (
              <HackathonForm
                onHackathonAdded={handleHackathonAdded}
                onCancel={() => setShowForm(false)}
              />
            )}

            {hackathons.length === 0 ? (
              <div className="no-hackathons">
                <h2>No Hackathons Available</h2>
                <p>Be the first to add a hackathon!</p>
              </div>
            ) : (
              <HackathonList
                hackathons={hackathons}
                onDelete={handleDeleteHackathon}
              />
            )}
          </>
        ) : currentPage === "dsa" ? (
          <DSASheets />
        ) : currentPage === "internships" ? (
          <InternshipPage />
        ) : null}
      </main>
    </div>
  );
}

export default App;
