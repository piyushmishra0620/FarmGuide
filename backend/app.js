const app = require('express');
const server = app();
const cors = require('cors');
const connectodb = require('./Connections/db');
const cookieparser = require('cookie-parser');
const authrouter = require('./Routes/authroutes.js');
const botrouter = require('./Routes/botroutes.js');

server.use(app.json());
server.use(app.urlencoded({ extended: true }));
server.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
server.use(cookieparser());

connectodb();
server.use('/auth', authrouter);
server.use(botrouter);

module.exports = server;
