const express = require('express');
const server = express();
const path = require('path');
let PORT = process.env.PORT || 4200;

// this might need to be changed to use the aws sdk to serve up images from there
let staticRegexOpen = new RegExp(/^\/open-iconic*$/);

server.use((req, res, next)=>{
    console.log(`url: ${req.url}`);
    next();
})
server.use(/open-iconic/, (req, res, next)=>{
    console.log(' use reached!!!');
    next();
    
});

server.get(/open-iconic/, (req, res, next)=>{
    console.log('get reached!!!');
    console.log('my asssss!!!');
    next();
    
});

server.get(/font/, (req, res, next)=>{
    console.log('get reached!!!');
    next();
    
});

server.get(/fonts/, (req, res, next)=>{
    console.log('get reached!!!');
    next();
    
});


server.use(express.static(__dirname + '/dist'));

server.get('/*', (req, res, next) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
