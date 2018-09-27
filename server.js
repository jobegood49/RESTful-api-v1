// Dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');

// Instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
  res.end('hello');
});

// Start the HTTP server
httpServer.listen(3000, () => {
  console.log('The HTTP server is running on port ' + 3000);
});

// Instantiate the HTTPS server

const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
};
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  res.end('hello secure');
});

// Start the HTTP server
httpsServer.listen(3001, () => {
  console.log('The HTTPS server is running on port ' + 3001);
});
