const { getCodechefScore } = require("../platforms/codechef_s");
const { getLeetCodeStats } = require("../platforms/leetcode");
const { getGFGUserProfile } = require("../platforms/gfg");
const { getInterviewBitScore } = require("../platforms/interviewbit");
const { getCodeforcesStats } = require("../platforms/codeforces");

async function fetchCodeChefScore(username) {
  try {
    const score = await getCodechefScore(username);
    return score || 0;
  } catch (error) {
    console.error(
      `Error fetching CodeChef score for ${username}:`,
      error.message
    );
    return 0;
  }
}

async function fetchLeetCodeScore(username) {
  try {
    const stats = await getLeetCodeStats(username);
    return stats ? stats.totalSolved || 0 : 0;
  } catch (error) {
    console.error(
      `Error fetching LeetCode score for ${username}:`,
      error.message
    );
    return 0;
  }
}

async function fetchGFGScore(username) {
  try {
    const profile = await getGFGUserProfile(username);
    return profile ? profile.problemsSolved || 0 : 0;
  } catch (error) {
    console.error(`Error fetching GFG score for ${username}:`, error.message);
    return 0;
  }
}

async function fetchInterviewBitScore(username) {
  try {
    const score = await getInterviewBitScore(username);
    return score || 0;
  } catch (error) {
    console.error(
      `Error fetching InterviewBit score for ${username}:`,
      error.message
    );
    return 0;
  }
}

async function fetchCodeForcesScore(username) {
  try {
    const stats = await getCodeforcesStats(username);
    return stats ? stats.totalSolved || 0 : 0;
  } catch (error) {
    console.error(
      `Error fetching CodeForces score for ${username}:`,
      error.message
    );
    return 0;
  }
}

module.exports = {
  fetchCodeChefScore,
  fetchLeetCodeScore,
  fetchGFGScore,
  fetchInterviewBitScore,
  fetchCodeForcesScore,
};
