const cron = require("node-cron");
const { refreshAllScores } = require("../services/scoreService");

function startScoreUpdateJob() {
  cron.schedule("0 0 * * *", async () => {
    console.log("[CRON] Starting daily score refresh...");
    try {
      await refreshAllScores();
      console.log("[CRON] Daily score refresh completed.");
    } catch (err) {
      console.error("[CRON] Error during score refresh:", err);
    }
  });
}

module.exports = { startScoreUpdateJob };
