const express = require('express');
const server = express();
const path = require('path');
let PORT = process.env.PORT || 4200;

// this might need to be changed to use the aws sdk to serve up images from there
let staticRegexOpen = new RegExp(/^\/open-iconic*$/);

server.use((req, res, next) => {
    console.log(`requested url: ${req.url}`);
    next();
})

function sethead(req, res, next) {
    console.log('reached');
    res.setHeader("Content-Type", 'font/opentype');
    next();
}
// server.get(/open-iconic/, sethead, express.static(__dirname + '/font/fonts'));
server.get(/open-iconic/, sethead);
server.use(express.static(__dirname + '/dist'));

server.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})