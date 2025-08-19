const UserProfile = require("../models/UserProfile");
const platformUtils = require("../utils/platformUtils");

const calculationCache = new Map();
const CACHE_DURATION = 30000;

/**
 * Calculate and store all platform scores for a given user.
 * @param {String} email - user email
 * @returns {Promise<Object>} updated user profile
 */
async function calculateAndStoreScores(email) {
  const cacheKey = email;
  const now = Date.now();

  if (calculationCache.has(cacheKey)) {
    const { timestamp, promise } = calculationCache.get(cacheKey);
    if (now - timestamp < CACHE_DURATION) {
      console.log(
        `⏳ Score calculation already in progress for ${email}, returning cached promise`
      );
      return promise;
    }
  }

  console.log(`🚀 Starting score calculation for ${email}`);
  const calculationPromise = performScoreCalculation(email);

  calculationCache.set(cacheKey, {
    timestamp: now,
    promise: calculationPromise,
  });

  calculationPromise.finally(() => {
    setTimeout(() => {
      calculationCache.delete(cacheKey);
    }, CACHE_DURATION);
  });

  return calculationPromise;
}

/**
 * Perform the actual score calculation
 * @param {String} email - user email
 * @returns {Promise<Object>} updated user profile
 */
async function performScoreCalculation(email) {
  const user = await UserProfile.findOne({ email });
  if (!user) throw new Error("User not found");

  const usernames = user.platformUsernames;

  const [
    codechefScore,
    leetcodeScore,
    gfgScore,
    interviewbitScore,
    codeforcesScore,
  ] = await Promise.all([
    platformUtils.fetchCodeChefScore(usernames.codechef),
    platformUtils.fetchLeetCodeScore(usernames.leetcode),
    platformUtils.fetchGFGScore(usernames.gfg),
    platformUtils.fetchInterviewBitScore(usernames.interviewbit),
    platformUtils.fetchCodeForcesScore(usernames.codeforces),
  ]);

  user.scores = {
    codechef: codechefScore,
    leetcode: leetcodeScore,
    gfg: gfgScore,
    interviewbit: interviewbitScore,
    codeforces: codeforcesScore,
  };

  await user.save();
  console.log(`✅ Score calculation completed for ${email}`);
  return user;
}

/**
 * Recalculate scores for all users and update the leaderboard.
 * @returns {Promise<void>}
 */
async function refreshAllScores() {
  console.log("🔄 Starting batch score refresh for all users");
  const users = await UserProfile.find({});
  console.log(`📊 Found ${users.length} users to update`);
  const promises = users.map((u) => calculateAndStoreScores(u.email));
  await Promise.all(promises);
  console.log("✅ Batch score refresh completed");
}

module.exports = {
  calculateAndStoreScores,
  refreshAllScores,
};
