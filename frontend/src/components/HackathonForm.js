import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import "./HackathonForm.css";

const HackathonForm = ({ onHackathonAdded, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    collegeName: "",
    location: "",
    isPaid: false,
    feeAmount: "",
    feeType: "per_team",
    maxTeamSize: "",
    lastDate: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axiosInstance.post("/hackathons", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onHackathonAdded(response.data);
      setFormData({
        name: "",
        collegeName: "",
        location: "",
        isPaid: false,
        feeAmount: "",
        feeType: "per_team",
        maxTeamSize: "",
        lastDate: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding hackathon:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="hackathon-form">
      <h2>Add New Hackathon</h2>

      <div className="form-group">
        <label>Hackathon Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>College Name:</label>
        <input
          type="text"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Last Date to Apply:</label>
        <input
          type="date"
          name="lastDate"
          value={formData.lastDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="isPaid"
            checked={formData.isPaid}
            onChange={handleChange}
          />
          Is Paid Hackathon?
        </label>
      </div>

      {formData.isPaid && (
        <>
          <div className="form-group">
            <label>Fee Amount:</label>
            <input
              type="number"
              name="feeAmount"
              value={formData.feeAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Fee Type:</label>
            <select
              name="feeType"
              value={formData.feeType}
              onChange={handleChange}
              required
            >
              <option value="per_team">Per Team</option>
              <option value="per_person">Per Person</option>
            </select>
          </div>
        </>
      )}

      <div className="form-group">
        <label>Maximum Team Size:</label>
        <input
          type="number"
          name="maxTeamSize"
          value={formData.maxTeamSize}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Hackathon Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="submit-button">
          Add Hackathon
        </button>
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default HackathonForm;
