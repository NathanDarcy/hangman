const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Word = require('../models/Word');

// initial game values
var guesses = [];
var word = getRandomWord();
var stage = 0;

router.get('/', (req, res) => {

    // make sure to start at stage 0 with no guesses
    while (guesses.length > 0){
        guesses.pop();
    }

    res.render('hangman', {
        title: 'Play Hangman!',
        stage: 0,
        word: word,
        guesses: guesses       
    });
});

router.post('/', (req, res) => {

    // Track guesses
    if (!guesses.includes(req.body.guess)){
        guesses.push(req.body.guess);
    }

    // check if guess was correct
    if (!word.includes(req.body.guess)){
        console.log("Not found in word...stage increasing...");
        stage++;
    }

    // Check for win condition
    if (isWin(word, guesses)){
        console.log("GAME WON!");
        
        // empty array of guesses
        while (guesses.length > 0){
               guesses.pop();
        }

        // route to end page
        res.render('gameOver', {
            title: "GAME OVER",
            stage: stage,
            word: word,
            result: "saved"
        });

        stage = 0;

        return;
        
    }
    
    // Check for loss condition
    if (stage == 7){
        console.log("GAME LOST!");
     
        // empty array of guesses
        while (guesses.length > 0){
            guesses.pop();
        }

        // send to results page
        res.render('gameOver', {
            title: "GAME OVER",
            stage: stage,
            word: word,
            result: "did not save"
        });

        
        stage = 0;

        return;
        
    }

    res.render('hangman', {
        title: 'Play Hangman!',
        stage: stage,
        word: word,
        guesses: guesses       
    });
});

// DB access
router.get('/getWords', (req, res) =>
    Word.findAll()
    .then(words => {
        console.log(words);
        res.sendStatus(200);
    })
    .catch(err => console.log(err)));

function isWin(word, guesses){
    for (var i = 0; i < word.length; i++){
        if (!guesses.includes(word[i])){
            // user has not guessed current index of word
            return false;
        }
    }

    // otherwise, user must have guessed all values
    return true;
}

function getRandomWord(){
    var word = Word.findAll()
    .then(words => {
        console.log(words);
    })
    .catch(err => console.log(err));

    return word;
}


module.exports = router;



