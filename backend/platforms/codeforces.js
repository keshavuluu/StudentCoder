const axios = require("axios");

async function getCodeforcesStats(username) {
  try {
    const submissionsResponse = await axios.get(
      "https://codeforces.com/api/user.status",
      {
        params: {
          handle: username,
          count: 10000,
        },
      }
    );

    if (submissionsResponse.data.status !== "OK") {
      console.log("Failed to fetch submissions.");
      return { totalSolved: 0 };
    }

    const submissions = submissionsResponse.data.result;

    const acceptedProblems = new Set();

    for (const submission of submissions) {
      if (submission.verdict === "OK") {
        const problemId = `${submission.problem.contestId}${submission.problem.index}`;
        acceptedProblems.add(problemId);
      }
    }

    // Fetch user rating info
    const userResponse = await axios.get(
      "https://codeforces.com/api/user.info",
      {
        params: {
          handles: username,
        },
      }
    );

    let rating = 0;
    if (
      userResponse.data.status === "OK" &&
      userResponse.data.result.length > 0
    ) {
      rating = userResponse.data.result[0].rating || 0;
    }

    // Calculate total score
    const totalSolved = acceptedProblems.size + rating;

    return { totalSolved: Math.round(totalSolved) };
  } catch (err) {
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error("Error:", err.message);
    }
    return { totalSolved: 0 };
  }
}

module.exports = { getCodeforcesStats };
