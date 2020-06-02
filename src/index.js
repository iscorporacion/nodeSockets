require("dotenv").config();

const http = require('http');
const app = require('./server');
const server = http.createServer(app);
const config = require('./config');

// require('./database');
require('./sockets').connection(server);

server.listen(config.port);
console.log("Server on port", config.port);
