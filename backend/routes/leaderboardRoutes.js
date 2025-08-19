const express = require("express");
const router = express.Router();
const UserProfile = require("../models/UserProfile");

router.get("/leaderboard", async (req, res) => {
  try {
    console.log("📊 Fetching leaderboard from database...");
    const userProfiles = await UserProfile.find({});

    const leaderboardData = userProfiles.map((user) => {
      const storedScores = user.scores || {};

      const overallScore =
        (storedScores.leetcode || 0) +
        (storedScores.codechef || 0) +
        (storedScores.gfg || 0) +
        (storedScores.interviewbit || 0) +
        (storedScores.codeforces || 0);

      return {
        rank: 0,
        name: `${user.firstName} ${user.lastName}`,
        username: user.platformUsernames.leetcode || user.email,
        codechef: storedScores.codechef || 0,
        gfg: storedScores.gfg || 0,
        interviewbit: storedScores.interviewbit || 0,
        leetcode: storedScores.leetcode || 0,
        codeforces: storedScores.codeforces || 0,
        overallScore: overallScore,
        isStarred: false,
        badges: [],
      };
    });

    leaderboardData.sort((a, b) => b.overallScore - a.overallScore);

    leaderboardData.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    console.log(`✅ Leaderboard loaded with ${leaderboardData.length} users`);
    res.json({
      success: true,
      data: leaderboardData,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leaderboard data",
    });
  }
});
module.exports = router;
