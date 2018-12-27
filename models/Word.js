const Sequelize = require('sequelize');
const db = require('../config/database');

const Word = db.define('word', {
    word: {
        type: Sequelize.STRING
    },
    difficulty: {
        type: Sequelize.STRING
    }
})

module.exports = Word;