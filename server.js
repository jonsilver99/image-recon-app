const express = require('express');
const server = express();
const path = require('path');
let PORT = process.env.PORT || 4200;

// this might need to be changed to use the aws sdk to serve up images from there
server.use(express.static(__dirname + '/app/dist'));

server.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname + '/app/dist/index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

console.log(__dirname)