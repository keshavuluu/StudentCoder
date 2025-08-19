const axios = require("axios");
const cheerio = require("cheerio");

async function getCodechefRating(username) {
  const url = `https://www.codechef.com/users/${username}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const rating = $(".rating-number").first().text().trim();

    if (rating) {
      console.log(`User: ${username} | CodeChef Rating: ${rating}`);
    } else {
      console.log(
        "Rating not found. User may not exist or page layout changed."
      );
    }
  } catch (err) {
    console.error("Error fetching profile:", err.message);
  }
}

async function getCodeChefContests() {
  try {
    const url =
      "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all";
    const response = await axios.get(url);

    if (response.data?.future_contests) {
      console.log("\n=== Upcoming CodeChef Contests ===");
      const contests = response.data.future_contests.slice(0, 5);
      contests.forEach((contest) => {
        const startTime = new Date(contest.contest_start_date);
        console.log(`\nContest: ${contest.contest_name}`);
        console.log(`Start: ${startTime.toLocaleString()}`);
        console.log(`Duration: ${contest.contest_duration} hours`);
        console.log(`Type: ${contest.contest_type}`);
      });
    }
  } catch (error) {
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

async function getCodechefProblemsSolved(username) {
  const url = `https://www.codechef.com/users/${username}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const problemsSolvedText = $(".rating-data-section > .user-details > li")
      .filter((i, el) => $(el).text().toLowerCase().includes("problems solved"))
      .text();

    if (problemsSolvedText) {
      const match = problemsSolvedText.match(/\d+/);
      if (match) {
        const problemsSolved = parseInt(match[0], 10);
        console.log(`User: ${username} | Problems Solved: ${problemsSolved}`);
        return problemsSolved;
      }
    }

    console.log(`Problems solved not found for user: ${username}`);
    return 0;
  } catch (err) {
    console.error(
      `Error fetching problems solved for ${username}:`,
      err.message
    );
    return 0;
  }
}

module.exports = {
  getCodechefRating,
  getCodeChefContests,
  getCodechefProblemsSolved,
};
