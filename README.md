Simple Hello World Pure node API

1. RESTful JSON API that listens on a port of your choice.

2. When someone GET request to the route /hello, you should return a hello message, in JSON format.

3. If the request method is POST, the http status emitted is 200, and the payload is `Hi, {toto}!` where {toto} comes from the POST payload.

4. If any other route is called, a 404 is emitted with an empty payload.
