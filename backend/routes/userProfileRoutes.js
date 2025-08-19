const express = require("express");
const UserProfile = require("../models/UserProfile");
const { calculateAndStoreScores } = require("../services/scoreService");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email } = req.body;

  let userProfile = await UserProfile.findOne({ email });
  if (!userProfile) {
    return res.status(404).json({
      success: false,
      message: "User not found. Please register first.",
    });
  }

  res.json({
    success: true,
    message: "User logged in. Please provide platform usernames.",
    platformUsernames: userProfile.platformUsernames,
  });
});

router.post("/", async (req, res) => {
  try {
    const { email, firstName, lastName, platformUsernames } = req.body;

    if (!email || !firstName || !lastName || !platformUsernames) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const requiredPlatforms = [
      "codechef",
      "leetcode",
      "gfg",
      "interviewbit",
      "codeforces",
    ];
    for (const platform of requiredPlatforms) {
      if (
        !platformUsernames[platform] ||
        platformUsernames[platform].trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          message: `${platform} username is required`,
        });
      }
    }

    let userProfile = await UserProfile.findOne({ email });
    if (userProfile) {
      userProfile.firstName = firstName;
      userProfile.lastName = lastName;
      userProfile.platformUsernames = platformUsernames;
    } else {
      userProfile = new UserProfile({
        email,
        firstName,
        lastName,
        platformUsernames,
      });
    }

    await userProfile.save();

    const updatedProfile = await calculateAndStoreScores(email);

    res.json({
      success: true,
      message: "Profile saved successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error in user profile creation/update:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ email: req.params.email });
    if (!profile) {
      return res.json({ exists: false });
    }
    res.json({
      exists: true,
      profile: profile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/leaderboard/all", async (req, res) => {
  try {
    const profiles = await UserProfile.find({})
      .select("email firstName lastName scores platformUsernames")
      .lean();

    const leaderboard = profiles
      .map((user) => {
        const totalScore = Object.values(user.scores).reduce(
          (sum, score) => sum + score,
          0
        );
        return {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          username: user.platformUsernames.leetcode || user.email,
          codechef: user.scores.codechef || 0,
          leetcode: user.scores.leetcode || 0,
          gfg: user.scores.gfg || 0,
          interviewbit: user.scores.interviewbit || 0,
          codeforces: user.scores.codeforces || 0,
          overallScore: totalScore,
          isStarred: false,
          badges: [],
        };
      })
      .sort((a, b) => b.overallScore - a.overallScore);

    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    res.json({
      success: true,
      data: leaderboard,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
