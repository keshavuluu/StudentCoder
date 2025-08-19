const cron = require('node-cron');
const UserProfile = require('../models/UserProfile');
const { calculateAndStoreScores } = require('../services/scoreService');

// Schedule a job to run every 24 hours
const resetScoresJob = cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Resetting scores for all users...');
    
    const users = await UserProfile.find({});
    
    for (const user of users) {
      // Reset scores
      user.scores = {
        codechefScore: 0,
        leetcodeScore: 0,
        gfgScore: 0,
        interviewbitScore: 0,
        codeforcesScore: 0
      };
      
      // Fetch and store current scores
      const updatedProfile = await calculateAndStoreScores(user.email);
      console.log(`Scores updated for ${user.email}:`, updatedProfile.scores);
    }
    
    console.log('Scores reset and updated successfully.');
  } catch (error) {
    console.error('Error resetting scores:', error);
  }
});

module.exports = { resetScoresJob };
