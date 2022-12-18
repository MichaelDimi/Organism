const express = require('express');
const Database = require('better-sqlite3');
const http = require('http');
const fs = require('fs'); 

const app = express();
const db = new Database('organism.db', { });
const server = http.createServer(app);

const port = 3000;

app.use(express.json());

app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: '../frontend'
    });
});

app.get('/:filename', function(req, res) {
    res.sendFile(req.params.filename, {
        root: '../frontend'
    });
});

// serve css files at route css/filname - filename is a param
app.get('/css/:filename', function(req, res) {
    res.sendFile(req.params.filename, {
        root: '../frontend/css'  
    });
});

// serve image files at route images/filename
app.get('/images/:filename', (req, res) => {
    res.sendFile(req.params.filename, {
        root: '../frontend/images'
    });
});

// serve font files at route fonts/filename
app.get('/fonts/:filename', (req, res) => {
    res.sendFile(req.params.filename, {
        root: '../frontend/fonts'
    });
});
app.get('/fonts/Inter/:filename', (req, res) => {
    res.sendFile(req.params.filename, {
        root: '../frontend/fonts/Inter'
    });
});

// serve js files at route js/filename
app.get('/js/:filename', (req, res) => {
    res.sendFile(req.params.filename, {
        root: '../frontend/js'
    });
});
app.get('/js/entities/:filename', (req, res) => {
    res.sendFile(req.params.filename, {
        root: '../frontend/js/entities'
    });
});
app.get('/js/map-painter/:filename', (req, res) => {
    res.sendFile(req.params.filename, {
        root: '../frontend/js/map-painter'
    });
});
app.get('/js/tests/:filename', (req, res) => {
    res.sendFile(req.params.filename, {
        root: '../frontend/js/tests'
    });
});

server.listen(port, () => {
    // Load the Database
    db.exec(fs.readFileSync(__dirname + '/scripts/schema.sql', 'utf8')); 
    console.log(`Organism server running at http://localhost:${port}`);
});
