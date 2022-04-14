const usernames = {};

const userwords = {};

const words = require('./words');

function addUser({ username, sid }) {
    usernames[username] = sid;
}

function countMatches(guess, secret) {
    let matches = 0;
    const letterCount = {};
    for( let letter of secret.toLowerCase() ) {
        letterCount[letter] = letterCount[letter] + 1 || 1;
    }

    for( let letter of guess.toLowerCase() ) {
        if( letterCount[letter] ) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }    
    return matches;
}

function verifyUser({ username, sid }) {
    if (usernames[username] && usernames[username] === sid) {
        return true;
    } else {
        return false;
    }
}

function addUserGuessWord({ username, guess }) {
    const matches = countMatches(guess, userwords[username]['secretWord']);
    const turns = Object.keys(userwords[username]['guessedWords']).length + 1;
    userwords[username]['guessedWords'][guess]=
        {
            matches: matches, 
            turns: turns
        };    
}

function continueGame(username) {
    const secretWord = getRandomSecretWord();
    console.log('Assigned new secret word for username: '+ username +' as: '+ secretWord);
    userwords[username] = {
        'secretWord': secretWord,
        'guessedWords': {}
    }
}

function newGame(username) {
    const secretWord = getRandomSecretWord();
    console.log('assigned new secret word for username: '+ username +' is: '+ secretWord);
    userwords[username] = {
        'secretWord': secretWord,
        'guessedWords': {}
    }
    Object.keys(userwords[username]['guessedWords']).forEach(k => delete userwords[username]['guessedWords'][k])
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getRandomSecretWord() {
    const rand = getRandomIntInclusive(0, words.length - 1);
    return words[rand];
}

const userinfo = {
    usernames,
    userwords,
    addUser,
    verifyUser,
    addUserGuessWord,
    newGame,
    continueGame
};

module.exports = userinfo;

