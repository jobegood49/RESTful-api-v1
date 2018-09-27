// Dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');
const config = require('./config');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
  // res.end('hello');
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
  // res.end('hello secure');
  unifiedServer(req, res);
});

// Start the HTTP server
httpsServer.listen(config.httpsPort, () => {
  console.log('The HTTPS server is running on port ' + config.httpsPort);
});

const unifiedServer = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const queryStringObject = parsedUrl.query;
  const method = req.method.toLowerCase();
  const headers = req.headers;

  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    let chosenHandler =
      typeof trimmedPath !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer,
    };

    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof statusCode == 'number' ? statusCode : 200;
      payload = typeof payload == 'object' ? payload : {};

      let payloadString = JSON.stringify(payload);
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });

  // res.end('hello world');

  // res.end(data);
};

// Define all the handlers
const handlers = {};

handlers.hello = (data, cb) => {
  cb(200, { hello: 'helloHandler' });
};

handlers.notFound = (data, cb) => {
  cb(404);
};

//Sample handler
handlers.ping = (data, cb) => {
  cb(200);
};

//Define he the request router
const router = {
  hello: handlers.hello,
  ping: handlers.ping,
};
