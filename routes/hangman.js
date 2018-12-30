const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Word = require('../models/Word');

// initial game values
var guesses = [];
var word = "default";
var stage = 0;

router.get('/', (req, res) => {

    // make sure to start at stage 0 with no guesses
    while (guesses.length > 0){
        guesses.pop();
    }
    stage = 0;


    // implement difficulty selector, get random word from array instead of simply 1st one
    Word.findAll( {raw: true})
    .then( function(words){

        // word is array of Word models

        word = (words[0].word);
        res.render('hangman', {
        title: 'Play Hangman!',
        stage: 0,
        word: word,
        guesses: guesses       
    });
    })
    .catch(err => { 
        console.log("couldn't connect to DB");
        word = "hangman";
        res.render('hangman', {
        title: 'Play Hangman!',
        stage: 0,
        word: word,
        guesses: guesses
    })});
});

router.post('/', (req, res) => {

    // Track guesses
    if (!guesses.includes(req.body.guess)){
        guesses.push(req.body.guess.toLowerCase());
    }

    // check if guess was correct
    if (!word.includes(req.body.guess)){
        console.log("Stage increasing to " + (stage + 1));
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



module.exports = router;



