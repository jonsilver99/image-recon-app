const express = require('express');
const server = express();
const path = require('path');
let PORT = process.env.PORT || 4200;

// this might need to be changed to use the aws sdk to serve up images from there
let staticRegexOpen = new RegExp(/^\/open-iconic*$/);

server.use((req, res, next)=>{
    console.log(__dirname + '/font/fonts');
    console.log(`url: ${req.url}`);
    next();
})
server.use(staticRegexOpen, express.static(__dirname + '/font/fonts'));
server.use(express.static(__dirname + '/dist'));

server.get('/*', (req, res, next) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
