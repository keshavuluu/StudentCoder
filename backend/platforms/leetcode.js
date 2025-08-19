const axios = require("axios");

async function getLeetCodeStats(username) {
  const url = "https://leetcode.com/graphql";

  const profileQuery = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
      }
    }`;

  try {
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      Referer: `https://leetcode.com/${username}/`,
      Origin: "https://leetcode.com",
    };

    const res = await axios.post(
      url,
      {
        query: profileQuery,
        variables: { username },
      },
      { headers }
    );

    const user = res.data.data.matchedUser;
    const contestInfo = res.data.data.userContestRanking;

    if (!user) {
      console.log(`User "${username}" not found.`);
      return null;
    }

    const totalSolved =
      user.submitStats.acSubmissionNum.find((d) => d.difficulty === "All")
        ?.count || 0;

    const rating = contestInfo?.rating || 0;

    const totalScore = totalSolved + rating;

    console.log(Math.round(totalScore));
    return { totalSolved: Math.round(totalScore) };
  } catch (err) {
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error("Error:", err.message);
    }
    return null;
  }
}

module.exports = { getLeetCodeStats };
