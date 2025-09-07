const {signup,login,logout,getuser:userdetails}= require('../Controllers/authcontrollers');
const {protected} = require('../Middlewares/authmiddlewares');
const server = require('express').Router();

server.post('/signup',signup);
server.post('/login',login);
server.post('/logout',logout);
server.get('/getuser',protected,userdetails);

module.exports=server;
