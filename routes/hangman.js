const express = require('express');
const router = express.Router();

var guesses = ["a", "b"];
var word = "abcd";
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

        stage = 0;

        // route to end page
        return;
        
    }
    
    // Check for loss condition
    if (stage == 7){
        console.log("GAME LOST!");
     
        // empty array of guesses
        while (guesses.length > 0){
            guesses.pop();
        }

        stage = 0;

        // send to results page

        res.render('gameOver', {
            title: "GAME OVER",
            stage: stage,
            word: word,
            result: "LOST",
            game: "hangman"
        });

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



