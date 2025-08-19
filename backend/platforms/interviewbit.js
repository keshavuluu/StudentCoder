const puppeteer = require("puppeteer");

async function getInterviewBitScore(username) {
  const url = `https://www.interviewbit.com/profile/${username}/`;
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  });
  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    console.log(`🔗 Navigating to ${url}`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

    await page.waitForSelector("body", { timeout: 10000 });

    await page.waitForTimeout(3000);

    const score = await page.evaluate(() => {
      const selectors = [
        '[data-testid="score"]',
        ".profile-score",
        ".score",
        ".user-stats .stat",
        ".user-statistics .stat",
        ".user-stats",
        ".stat",
        ".profile-stats",
        ".stats-item",
        ".achievement-score",
        ".total-score",
        ".points",
        ".user-score",
      ];

      for (const sel of selectors) {
        const elements = document.querySelectorAll(sel);
        for (const el of elements) {
          if (el && /\d+/.test(el.textContent)) {
            const match = el.textContent.match(/(\d+)/);
            if (match && parseInt(match[1]) > 0) {
              return parseInt(match[1]);
            }
          }
        }
      }

      const bodyText = document.body.innerText;
      const patterns = [
        /problems?\s+solved[:\s]*(\d+)/i,
        /(\d+)\s+problems?\s+solved/i,
        /solved[:\s]*(\d+)\s+problems?/i,

        /programming[:\s]+(\d+)/i,
        /coding[:\s]+(\d+)/i,

        /score[:\s]+(\d+)/i,
        /points[:\s]+(\d+)/i,
        /total[:\s]+(\d+)/i,
      ];

      for (const pattern of patterns) {
        const match = bodyText.match(pattern);
        if (match && parseInt(match[1]) > 0 && parseInt(match[1]) < 10000) {
          return parseInt(match[1]);
        }
      }

      const numberMatches = bodyText.match(/\b(\d{1,4})\b/g);
      if (numberMatches) {
        const numbers = numberMatches
          .map((n) => parseInt(n))
          .filter((n) => n >= 10 && n <= 5000);
        if (numbers.length > 0) {
          return numbers.find((n) => n >= 50) || numbers[0];
        }
      }

      return null;
    });

    if (score) {
      console.log(`✅ InterviewBit score for "${username}": ${score}`);
    } else {
      console.log(`⚠️ Could not find score for "${username}".`);
      console.log(
        "    - The profile may be private or the page structure has changed."
      );

      const pageTitle = await page.title();
      const pageContent = await page.evaluate(() => {
        return document.body.innerText.substring(0, 500);
      });
      console.log(`    - Page title: "${pageTitle}"`);
      console.log(
        `    - Page content preview: "${pageContent.substring(0, 200)}..."`
      );

      if (
        pageTitle.includes("Deployment Paused") ||
        pageContent.includes("deployment is temporarily paused")
      ) {
        console.log(
          `    - ⚠️ InterviewBit website appears to be temporarily down`
        );
        console.log(`    - 🔄 Will retry later during scheduled updates`);
      }
    }

    console.log(`🏆 Total Score: ${score || 0}`);

    return score || 0;
  } catch (err) {
    console.error("❌ Error:", err.message);
    console.log("🏆 Total Score: 0");
    return 0;
  } finally {
    await browser.close();
  }
}

async function testInterviewBitScore(username = "keshavulu-muppa") {
  console.log(`🧪 Testing InterviewBit scraper with username: ${username}`);
  try {
    const score = await getInterviewBitScore(username);
    console.log(`✅ Test result: ${score}`);
    return score;
  } catch (error) {
    console.error(`❌ Test failed:`, error.message);
    return 0;
  }
}

module.exports = { getInterviewBitScore, testInterviewBitScore };
