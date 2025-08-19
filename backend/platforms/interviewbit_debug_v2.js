const puppeteer = require('puppeteer');

async function getInterviewBitScore(username) {
  const url = `https://www.interviewbit.com/profile/${username}/`;
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set user agent to avoid detection
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  try {
    console.log(`🔗 Navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Capture the HTML content for debugging
    const htmlContent = await page.content();
    console.log(`HTML Content for ${username}:`, htmlContent);

    // Check for deployment paused or private profile
    if (htmlContent.includes('This deployment is temporarily paused')) {
      console.log(`⚠️ Profile "${username}" is currently not accessible.`);
      return 0;
    }

    // Check for private profile or 404
    const pageStatus = await page.evaluate(() => {
      const title = document.title.toLowerCase();
      const bodyText = document.body.innerText.toLowerCase();
      
      // Check for private profile indicators
      if (title.includes('not found') || bodyText.includes('private') || bodyText.includes('not found') || bodyText.includes('404')) {
        return 'private';
      }
      
      // Check for actual profile page
      if (bodyText.includes('interviewbit') && (bodyText.includes('score') || bodyText.includes('points'))) {
        return 'public';
      }
      
      return 'unknown';
    });

    if (pageStatus === 'private') {
      console.log(`⚠️ Profile "${username}" is private or does not exist`);
      return 0;
    }

    // Wait a bit for dynamic content to load
    await page.waitForTimeout(2000);

    // Enhanced score extraction with multiple strategies
    const score = await page.evaluate(() => {
      // Strategy 1: Look for specific InterviewBit elements
      const scoreElements = [
        '.profile-header .score',
        '.user-stats .score-value',
        '.score-card .points',
        '[data-testid="total-score"]',
        '.total-score',
        '.user-statistics .stat-value',
        '.stats-container .score',
        '.profile-score',
        '.score',
        '.points',
        '.rating'
      ];

      // Try each selector
      for (const selector of scoreElements) {
        const elements = document.querySelectorAll(selector);
        for (const el of elements) {
          const text = el.textContent.trim();
          const match = text.match(/(\d+(?:,\d{3})*(?:\.\d+)?)/);
          if (match) {
            const score = parseInt(match[1].replace(/,/g, ''));
            if (score >= 0 && score <= 100000) { // Reasonable score range
              return score;
            }
          }
        }
      }

      return null;
    });

    if (score !== null) {
      console.log(`✅ InterviewBit score for "${username}": ${score}`);
      return score;
    } else {
      console.log(`⚠️ Could not extract score for "${username}" - page structure may have changed`);
      return 0;
    }

  } catch (err) {
    console.error('❌ InterviewBit scraping error:', err.message);
    return 0;
  } finally {
    await browser.close();
  }
}

module.exports = { 
  getInterviewBitScore 
};
