import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import UserProfileDropdown from "./UserProfileDropdown";
import { axiosInstance } from "../lib/axios";

const Leaderboard = ({ user, isSignedIn, onNavigate, onLogout }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "asc",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (key === "name") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }

      return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
    });
    setData(sortedData);
  };

  const renderBadges = (badges) => {
    return badges.map((badge, index) => (
      <span
        key={index}
        className={`badge ${badge.includes("🔴") ? "danger" : ""}`}
      >
        {badge}
      </span>
    ));
  };

  const renderStarIcon = (isStarred) => {
    return isStarred ? <span className="star-icon">⭐</span> : null;
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/leaderboard");
      setData(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to load leaderboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <UserProfileDropdown
          user={user}
          isSignedIn={isSignedIn}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
        <div className="leaderboard-header">
          <h1>Student Coding Leaderboard</h1>
          <p>Track coding progress across multiple platforms</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading leaderboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <UserProfileDropdown
          user={user}
          isSignedIn={isSignedIn}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
        <div className="leaderboard-header">
          <h1>Student Coding Leaderboard</h1>
          <p>Track coding progress across multiple platforms</p>
        </div>
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchLeaderboardData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <UserProfileDropdown
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <div className="leaderboard-header">
        <h1>Student Coding Leaderboard</h1>
        <p>Track coding progress across multiple platforms</p>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("rank")} className="sortable">
                Rank
              </th>
              <th onClick={() => handleSort("name")} className="sortable">
                Name
              </th>
              <th onClick={() => handleSort("codechef")} className="sortable">
                CodeChef
                <span className="sub-header">Problems Solved</span>
              </th>
              <th onClick={() => handleSort("gfg")} className="sortable">
                GeeksforGeeks
                <span className="sub-header">Problems Solved</span>
              </th>
              <th
                onClick={() => handleSort("interviewbit")}
                className="sortable"
              >
                InterviewBit
                <span className="sub-header">Problems Solved</span>
              </th>
              <th onClick={() => handleSort("leetcode")} className="sortable">
                LeetCode
                <span className="sub-header">Problems Solved</span>
              </th>
              <th onClick={() => handleSort("codeforces")} className="sortable">
                Codeforces
                <span className="sub-header">Problems Solved</span>
              </th>
              <th
                onClick={() => handleSort("overallScore")}
                className="sortable"
              >
                Overall Score
                <span className="sub-header">Total Problems</span>
              </th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr
                key={student.rollNumber}
                className={student.rank <= 3 ? "top-performer" : ""}
              >
                <td>
                  <span className="rank-number">{student.rank}</span>
                </td>
                <td className="name-cell">
                  {renderStarIcon(student.isStarred)}
                  <span className="student-name">{student.name}</span>
                  <div className="badges">{renderBadges(student.badges)}</div>
                </td>
                <td className="score-cell">
                  <span className="score">{student.codechef}</span>
                </td>
                <td className="score-cell">
                  <span className="score">{student.gfg}</span>
                </td>
                <td className="score-cell">
                  <span className="score">{student.interviewbit}</span>
                </td>
                <td className="score-cell">
                  <span className="score">{student.leetcode}</span>
                </td>
                <td className="score-cell">
                  <span className="score">{student.codeforces}</span>
                </td>
                <td className="score-cell overall-score">
                  <span className="score">
                    {student.overallScore.toLocaleString()}
                  </span>
                </td>
                <td className="username-cell">
                  <span className="username">{student.username}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="leaderboard-footer">
        <p>
          Data refreshes daily at 12:00 AM. Rankings based on total problems
          solved across all platforms.
        </p>
        <div className="platform-legend">
          <span>CC: CodeChef</span>
          <span>GFG: GeeksforGeeks</span>
          <span>IB: InterviewBit</span>
          <span>LC: LeetCode</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
