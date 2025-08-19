import React from "react";
import "./First.css";
import UserProfileDropdown from "../components/UserProfileDropdown";

const roadmap = [
  {
    year: "Year 1",
    timeline: "First Year",
    steps: [
      "45 days mastering C programming",
      "45 days mastering Java",
      "45 days mastering C++",
      "45 days mastering Python",
      "Complete Python Full Stack Development",
      "Next 3 months: Dive into AI & ML with hands-on projects",
    ],
    note: "Focus on building strong programming fundamentals. Explore different languages to find your comfort zone. Start building small projects and participate in coding contests.",
  },
  {
    year: "Year 2",
    timeline: "Second Year",
    steps: [
      "MERN Stack (4 months): Master MongoDB, Express, React, Node.js",
      "Sharpen communication skills",
      "Learn deployment: Host your projects online (Netlify, Vercel, Heroku, etc.)",
      "Start learning Data Structures & Algorithms (DSA) early: Arrays, Strings, Recursion, Linked Lists, Stacks, Queues, Trees, Advanced Recursion, etc.",
    ],
    note: "This is the year to build real-world projects and showcase them on GitHub. Begin your DSA journey alongside development. Communication and deployment skills are crucial for interviews and teamwork.",
  },
  {
    year: "Year 3",
    timeline: "Third Year & Beyond",
    steps: [
      "Practice more DSA: Deepen your understanding and problem-solving skills.",
      "Cover advanced topics: Linked Lists, Stacks, Queues, Trees, Advanced Recursion, Dynamic Programming, Graphs, Trie, etc.",
      "After learning each topic, practice problems on platforms like LeetCode, Codeforces, or GFG.",
      "Start applying for internships at product-based companies (on-campus & off-campus)",
    ],
    note: "Consistency is key. Make DSA practice a daily habit, revise regularly, and participate in mock interviews. This is the prime time to apply for internships and build your professional network.",
  },
  {
    year: "Year 4",
    timeline: "Final Year",
    steps: [
      "Continue advanced DSA and system design",
      "Work on open-source or major personal projects",
      "Prepare for off-campus placements at top product-based companies",
      "Refine your resume and LinkedIn profile",
    ],
    note: "Focus on interview preparation, resume building, and applying to your dream companies. Stay motivated and help peers.",
  },
];

const motivationalTips = [
  "Stay consistent and avoid procrastination.",
  "Practice what you learn by building projects and solving problems.",
  "Document your journey on GitHub and LinkedIn.",
  "Seek feedback, join communities, and help others.",
  "Remember: This roadmap is tried and tested. Trust the process and give your best!",
];

const First = ({ user, isSignedIn, onNavigate, onLogout }) => {
  return (
    <div className="roadmap-container">
      <UserProfileDropdown
        user={user}
        isSignedIn={isSignedIn}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      <h1 className="roadmap-title">
        Year-wise Roadmap to Crack Product-Based Companies
      </h1>
      <p className="roadmap-intro">
        Follow this genuine, step-by-step roadmap to maximize your chances of
        landing internships and placements at top product-based companies. No
        need to doubt—just stay consistent and give your best effort!
      </p>
      <div className="roadmap-grid">
        {roadmap.map((year, idx) => (
          <div className="roadmap-card" key={year.year}>
            <h2>{year.year}</h2>
            <h4>{year.timeline}</h4>
            <ul>
              {year.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
            <div className="roadmap-note">{year.note}</div>
          </div>
        ))}
      </div>
      <div className="motivation-section">
        <h2>Tips for Success</h2>
        <ul>
          {motivationalTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
      <div className="resources-section">
        <h2>Resources for Above Topics</h2>
        <ul>
          <li>
            <b>C Programming:</b>{" "}
            <a
              href="https://youtube.com/playlist?list=PLdo5W4Nhv31a8UcMN9-35ghv8qyFWD9_S&si=zmJMuFigXNfZk_Te"
              target="_blank"
              rel="noopener noreferrer"
            >
              Complete C Playlist
            </a>
          </li>
          <li>
            <b>C++ Programming:</b>{" "}
            <a
              href="https://youtube.com/playlist?list=PLdo5W4Nhv31YU5Wx1dopka58teWP9aCee&si=tF03rN1Wa_SbM8e6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Complete C++ Playlist
            </a>
          </li>
          <li>
            <b>Java Programming:</b>{" "}
            <a
              href="https://youtube.com/playlist?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5&si=XxHijJYuuXkqq_HB"
              target="_blank"
              rel="noopener noreferrer"
            >
              Complete Java Playlist
            </a>
          </li>
          <li>
            <b>Python Programming:</b>{" "}
            <a
              href="https://youtube.com/playlist?list=PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3&si=DviKRqLX3fEDccM5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Complete Python Playlist
            </a>
          </li>
          <li>
            <b>AI:</b>{" "}
            <a
              href="https://youtu.be/GhTREKMYp34?si=Yuo-HyyYnPC0eH1p"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Crash Course
            </a>
          </li>
          <li>
            <b>Machine Learning:</b>{" "}
            <a
              href="https://youtu.be/GwIo3gDZCVQ?si=3gzhMYCNOSLY2pp9"
              target="_blank"
              rel="noopener noreferrer"
            >
              ML Crash Course
            </a>
          </li>
          <li>
            <b>ML Projects:</b>{" "}
            <a
              href="https://youtube.com/playlist?list=PLdF3rLdF4ICTDKN1VVTfAv35NR5mjK_hk&si=WJ4IFN4Zt1sHUSj6"
              target="_blank"
              rel="noopener noreferrer"
            >
              ML Projects Playlist
            </a>
          </li>
          <li>
            <b>MERN Stack:</b>{" "}
            <a
              href="https://youtube.com/playlist?list=PLDzeHZWIZsTo0wSBcg4-NMIbC0L8evLrD&si=qufG9xa5wUCuEsQW"
              target="_blank"
              rel="noopener noreferrer"
            >
              MERN Stack Playlist
            </a>
          </li>
          <li>
            <b>Deployment:</b>{" "}
            <a
              href="https://youtu.be/gViEtIJ1DCw?si=gg5I8tduOb913nbS"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deployment Guide
            </a>
          </li>
          <li>
            <b>Data Structures (DSA):</b>{" "}
            <a
              href="https://youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz&si=9jyYz2x7IEsi8h1E"
              target="_blank"
              rel="noopener noreferrer"
            >
              Striver's DSA Playlist
            </a>
          </li>
          <li>
            <b>Contests & Code Explanations:</b> TLE Eliminators - by Priyansh
            (YouTube)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default First;
