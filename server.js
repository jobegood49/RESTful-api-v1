// Dependencies
const http = require('http');

// Instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
    res.end("hello")
});

// Start the HTTP server
httpServer.listen(3000, () => {
  console.log('The HTTP server is running on port ' + 3000);
});
