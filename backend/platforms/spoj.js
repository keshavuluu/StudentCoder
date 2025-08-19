const axios = require("axios");

async function getSPOJSolvedCount(username) {
  try {
    const url = `https://www.spoj.com/users/${username}/`;
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const html = response.data;
    
    const solvedCountMatch = html.match(
      /<dt><span class="fa fa-check fa-fw"><\/span>&nbsp;Problems solved<\/dt>\s*<dd>(\d+)<\/dd>/
    );

    if (!solvedCountMatch) {
      console.log("0");
      return 0;
    }

    const solvedCount = parseInt(solvedCountMatch[1], 10);
    console.log(solvedCount);
    return solvedCount;
  } catch (error) {
    console.error("Error fetching SPOJ solved count:", error.message);
    return null;
  }
}
getSPOJSolvedCount("keshavulu03");

module.exports = { getSPOJSolvedCount };
