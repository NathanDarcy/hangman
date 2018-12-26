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

    console.log(req.body.guess);
    guesses.push(req.body.guess);
    console.log(guesses);
    console.log("Stage is " + stage);

    // Check for win condition

    // Check for loss condition
    if (stage == 7){
        console.log("GAME OVER!");
     
        // empty array of guesses
        while (guesses.length > 0){
            guesses.pop();
        }

        // figure our what to do after game is over
    }

    if (!word.includes(req.body.guess)){
        console.log("Not found in word...stage increasing...");
        stage++;
    }

    res.render('hangman', {
        title: 'Play Hangman!',
        stage: stage,
        word: word,
        guesses: guesses       
    });
});

module.exports = router;



