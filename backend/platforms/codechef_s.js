const fetch = require("node-fetch");
const cheerio = require("cheerio");

async function getCodechefScore(username) {
  try {
    const url = `https://www.codechef.com/users/${username}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    if (!res.ok) {
      console.error(`HTTP error: ${res.status} ${res.statusText}`);
      return 0;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    const rating = $(".rating-number").first().text().trim();

    if (rating) {
      const ratingNumber = Number(rating);
      return isNaN(ratingNumber) ? rating : ratingNumber;
    } else {
      console.log("Could not find rating on the profile page.");
      return 0;
    }
  } catch (err) {
    console.error("Error:", err.message);
    return 0;
  }
}

module.exports = {
  getCodechefScore,
};
