const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/leaderboard',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', JSON.parse(data));
  });
});

req.on('error', (error) => {
  console.error('Error fetching leaderboard:', error);
});

req.end();
