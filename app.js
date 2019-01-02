// imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');

const app = express();

// middleware for bodyParser
app.use(bodyParser.json() ); //handles parsing for json
app.use(bodyParser.urlencoded( {extended: false} )); //writes documentation for bodyParser

// middleware for static resources (css, jquery, etc), sets static path
app.use(express.static( path.join(__dirname, 'public') ));

// View Engine for ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join( __dirname, 'views'));



// Test DB
db.authenticate()
.then( () => {
    console.log('Connected');
})
.catch(err => {
    console.log('Error' + err);
});


// Home
app.get('/', function(req, res){
    res.render('index', {
        title: 'Hangman Home'        
    });
});

// About
app.get('/about', function(req, res){
    res.render('about', {
        title: 'Hangman About'        
    });
});

/* Game routes */
// hangman
app.use('/hangman', require('./routes/hangman'));




// Server startup
app.listen(3000, function(){
    console.log('Server started on port 3000...');
});