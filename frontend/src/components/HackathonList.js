import React from "react";
import "./HackathonList.css";

const HackathonList = ({ hackathons, onDelete }) => {
  const getDaysRemaining = (lastDate) => {
    const today = new Date();
    const deadline = new Date(lastDate);
    const timeDiff = deadline.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const getUrgencyStatus = (daysRemaining) => {
    if (daysRemaining <= 0) return "expired";
    if (daysRemaining <= 3) return "urgent";
    if (daysRemaining <= 7) return "warning";
    return "normal";
  };

  return (
    <div className="hackathon-list">
      <h2>Available Hackathons</h2>
      <div className="hackathon-grid">
        {hackathons.map((hackathon) => {
          const daysRemaining = getDaysRemaining(hackathon.lastDate);
          const urgencyStatus = getUrgencyStatus(daysRemaining);

          return (
            <div
              key={hackathon._id}
              className={`hackathon-card ${urgencyStatus}`}
            >
              {hackathon.image && (
                <div className="hackathon-image-wrapper">
                  <div className="hackathon-image">
                    <img
                      src={`http://localhost:5001/${hackathon.image}`}
                      alt={hackathon.name}
                    />
                    <span className={`available-badge ${urgencyStatus}`}>
                      {urgencyStatus === "urgent"
                        ? `${daysRemaining} days left!`
                        : urgencyStatus === "warning"
                        ? `${daysRemaining} days left`
                        : "Available"}
                    </span>
                  </div>
                </div>
              )}
              <div className="hackathon-details">
                <h3>{hackathon.name}</h3>
                <p>
                  <strong>College:</strong> {hackathon.collegeName}
                </p>
                <p>
                  <strong>Location:</strong> {hackathon.location}
                </p>
                <p>
                  <strong>Team Size:</strong> Max {hackathon.maxTeamSize}{" "}
                  members
                </p>
                <p>
                  <strong>Registration:</strong>{" "}
                  {hackathon.isPaid ? (
                    <>
                      ₹{hackathon.feeAmount} (
                      {hackathon.feeType === "per_team"
                        ? "per team"
                        : "per person"}
                      )
                    </>
                  ) : (
                    "Free"
                  )}
                </p>
                {hackathon.lastDate && (
                  <p className={`deadline ${urgencyStatus}`}>
                    <strong>Last Date to Apply:</strong>{" "}
                    {new Date(hackathon.lastDate).toLocaleDateString()}
                    {urgencyStatus === "urgent" && (
                      <span className="urgent-text"> - URGENT!</span>
                    )}
                    {urgencyStatus === "warning" && (
                      <span className="warning-text"> - Closing Soon</span>
                    )}
                  </p>
                )}
                <button
                  className="delete-button"
                  onClick={() => onDelete(hackathon._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HackathonList;
