const { getInterviewBitScore } = require('./platforms/interviewbit_debug_v2');

// Test with different usernames
const testUsernames = [
  'keshavulu-muppa',
  'test-user',
  'john-doe',
  'sachin-kumar'
];

async function runTests() {
  console.log('🚀 Starting InterviewBit scraping tests...\n');
  
  for (const username of testUsernames) {
    console.log(`\n--- Testing: ${username} ---`);
    const score = await getInterviewBitScore(username);
    console.log(`📊 Final result for ${username}: ${score}`);
    console.log('--- End Test ---\n');
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('✅ All tests completed!');
}

// Run if called directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
