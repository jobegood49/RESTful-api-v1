// Dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');
const config = require('./config')

// Instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
  res.end('hello');
});

// Start the HTTP server
httpServer.listen(config.httpPort, () => {
  console.log('The HTTP server is running on port ' + config.httpPort);
});

// Instantiate the HTTPS server

const httpsServerOptions = {
  key: fs.readFileSync('../https/key.pem'),
  cert: fs.readFileSync('../https/cert.pem'),
};
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  res.end('hello secure');
});

// Start the HTTP server
httpsServer.listen(config.httpsPorts, () => {
  console.log('The HTTPS server is running on port ' + config.httpsPort);
});
