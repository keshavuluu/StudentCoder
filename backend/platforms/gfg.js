const axios = require("axios");
const cheerio = require("cheerio");

// Function to get GFG user profile data including coding score
async function getGFGUserProfile(username) {
  try {
    //console.log(`Fetching GFG profile for user: ${username}`);

    const url = `https://auth.geeksforgeeks.org/user/${username}/?utm_source=geeksforgeeks&utm_medium=my_profile&utm_campaign=auth_user`;

    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: 15000,
    });

    const $ = cheerio.load(html);

    let codingScore = null;
    const scoreSelectors = [
      ".score_cards_container .score_card:nth-child(1) .score_number",
      ".coding-score .score",
      '[data-testid="coding-score"]',
      ".profile-stats .score",
      ".user-stats .coding-score",
      ".score-card .score",
      ".stats-container .coding-score",
      ".profile-info .coding-score",
    ];

    for (const selector of scoreSelectors) {
      const scoreElement = $(selector);
      if (scoreElement.length > 0) {
        codingScore = scoreElement.text().trim();
        break;
      }
    }

    if (!codingScore) {
      const bodyText = $("body").text();
      const scoreMatch = bodyText.match(/coding score[:\s]*(\d+)/i);
      if (scoreMatch) {
        codingScore = scoreMatch[1];
      }
    }

    let problemsSolved = null;
    const problemsSelectors = [
      ".score_cards_container .score_card:nth-child(2) .score_number",
      ".problems-solved .score",
      '[data-testid="problems-solved"]',
      ".profile-stats .problems",
      ".user-stats .problems-solved",
    ];

    for (const selector of problemsSelectors) {
      const problemsElement = $(selector);
      if (problemsElement.length > 0) {
        problemsSolved = problemsElement.text().trim();
        break;
      }
    }

    if (!problemsSolved) {
      const bodyText = $("body").text();
      const problemsMatch = bodyText.match(/problem solved[:\s]*(\d+)/i);
      if (problemsMatch) {
        problemsSolved = problemsMatch[1];
      }
    }

    const userNotFound =
      $("body").text().toLowerCase().includes("user not found") ||
      $("body").text().toLowerCase().includes("404") ||
      $("body").text().toLowerCase().includes("page not found");

    if (userNotFound) {
      return null;
    }

    const problemsSolvedNum = problemsSolved ? parseInt(problemsSolved) : 0;

    return {
      problemsSolved: problemsSolvedNum,
    };
  } catch (error) {
    console.error(`Error fetching GFG profile for ${username}:`, error.message);
    return null;
  }
}

module.exports = { getGFGUserProfile };
