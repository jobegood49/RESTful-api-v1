Simple Hello World Pure node API

1. RESTful JSON API that listens on a port of your choice.

2. When someone GET request to the route /hello, you should return a hello message, in JSON format.

3. If the request method is POST, the http status emitted is 200, and the payload is `Hello, {name}!` where {name} comes from the POST payload. If the same route is called as GET, status emitted is still 200, but payload is empty.

4. If any other route is called, a 404 is emitted with an empty payload.
