import React from "react";
import "./DSASheets.css";

const DSASheets = () => {
  const dsaSheets = [
    {
      name: "Summer Vacation DSA Problem Sheet",
      file: "SUMMER VACATION DSA PROBLEM SHEET.docx",
      type: "docx",
    },
    {
      name: "DSA Day-wise Plan",
      file: "DSA Day-wise.xlsx",
      type: "xlsx",
    },
    {
      name: "FINAL 450 Problems",
      file: "FINAL450.xlsx",
      type: "xlsx",
    },
    {
      name: "Leetcode DSA Sheet by Fraz",
      file: "Leetcode DSA sheet by Fraz .xlsx",
      type: "xlsx",
    },
    {
      name: "DSA Sheet by Arsh (45 Days Plan)",
      file: "DSA Sheet by Arsh (45 Days Plan).xlsx",
      type: "xlsx",
    },
    {
      name: "DSA by Shradha Didi & Aman Bhaiya",
      file: "DSA by Shradha Didi & Aman Bhaiya.xlsx",
      type: "xlsx",
    },
  ];

  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = `/dsasheets/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dsa-sheets-container">
      <h2>DSA Practice Sheets</h2>
      <p className="sheets-description">
        Download these carefully curated DSA sheets to enhance your
        problem-solving skills. Each sheet contains a comprehensive collection
        of problems to help you master Data Structures and Algorithms.
      </p>
      <div className="sheets-grid">
        {dsaSheets.map((sheet) => (
          <div
            key={sheet.name}
            className="sheet-card"
            onClick={() => handleDownload(sheet.file)}
          >
            <h3>{sheet.name}</h3>
            <p className="file-type">{sheet.type.toUpperCase()}</p>
            <p className="download-hint">Click to download</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DSASheets;
