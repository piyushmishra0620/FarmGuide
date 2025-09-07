const {bot} = require('../Controllers/botcontroller');
const server = require('express').Router();

server.post('/botreply',bot);

module.exports=server;