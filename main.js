const http = require('http');
// function rqListener(req, res) {} a function to request the server to send a reply to the request made
const routes = require('./routes.js');

const server = http.createServer(routes);


server.listen(3000);


