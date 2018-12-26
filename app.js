// Commands to start this app
// npm init
// npm install express --save
// npm install body-parser --save
// npm install ejs --save
// npm install nodemon -g


// imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// middleware for bodyParser
app.use(bodyParser.json() ); //handles parsing for json
app.use(bodyParser.urlencoded( {extended: false} )); //writes documentation for bodyParser

// middleware for static resources (css, jquery, etc), sets static path
app.use(express.static( path.join(__dirname, 'public') ));

// View Engine for ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join( __dirname, 'views'));

// "Controller" routing

// Home
app.get('/', function(req, res){
    res.render('index', {
        title: 'GridGames Home'        
    });
});

// About
app.get('/about', function(req, res){
    res.render('about', {
        title: 'GridGames About'        
    });
});

app.use('/hangman', require('./routes/hangman'));




// Server startup
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});