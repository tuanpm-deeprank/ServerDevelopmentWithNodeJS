const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const disRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter')
const hostname = 'localhost';
const port = 3000;

// We are saying that our app is going to use express
const app = express();
// Use morgan with developement version
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', disRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
// Allow express to server up static files from __dirname = root of project
app.use(express.static(__dirname + '/public'));

// use next to invoke additional middleware
app.use((req, res, next) => {
    //console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})