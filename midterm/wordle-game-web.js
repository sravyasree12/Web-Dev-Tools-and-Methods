
const userinfo = require("./userinfo");
const words = require("./words");



const wordleGameWeb = {
  gamePage: function({username, guesses, errormessage}) {
      return `
        <!doctype html>
        <html>
          <head>
            <title>Wordle Game</title>
            <link rel="stylesheet" href="/css/game.css" />
          </head>
          <body>
            <div id='game'>
              <div class='welcomeMessage'>
                <p>Hi ${username}! Are you ready to guess?</p>
              </div>
              <div class='gameBody'>
                <div class='guess'>
                  <div class='guessList'>
                      <p class='title'>The accepted guesses you've made:</p>
                      ${wordleGameWeb.getAllGuessedWords(guesses)}
                  </div>
                  <div class='guessForm'>
                    <form action="/" method="POST">
                        <input id="guess" name="guess" value="" placeholder="Enter your guess word" pattern="[a-zA-Z]+" minlength="5" maxlength="5"/>
                        <button id="guess-submitBtn" type="submit">Submit <img src="https://img.icons8.com/nolan/24/forward.png"/></button><br>
                        <label>* Guess word can only contain words from list with length of 5 </label>
                    </form>
                  </div>
                  <div class='logoutBtn'>
                    <form action="/logout" method="POST">
                        <button id="logoutBtn" type= "submit">Logout <img src="https://img.icons8.com/nolan/24/logout-rounded.png"/></button><br>
                    </form>
                  </div>
                  <div class='newGameBtn'>
                    <form action="/new-game" method="POST">
                        <button id="newGameBtn" type= "submit"><img src="https://img.icons8.com/nolan/24/brand-new.png"/> New Game</button>
                    </form>
                  </div>
                  <div class='result'>
                    ${wordleGameWeb.showResult(username, guesses, errormessage)}
                  </div>
                  <div class='validList'>
                      <p class='title'>Valid guess words:</p>
                      ${wordleGameWeb.getAllValidWords(words)}
                  </div>
                </div>
              </div>
            </div>
            <script>
            let input = document.querySelector("#guess");
            let button = document.querySelector("#guess-submitBtn");
            button.disabled = true;
            input.addEventListener("input", stateHandle);
            
            function stateHandle() {
                if(document.querySelector("#guess").value === ""
                   ) {
                    button.disabled = true;
                } else {
                    button.disabled = false;
                }
            }
          </script>
          </body>
        </html>
      `;
    },
    
    loginForm: function() {
      return `
      <!doctype html>
        <html>
          <head>
            <title>Wordle Game</title>
            <link rel="stylesheet" href="/css/game.css" />
          </head>
          <body>
            <div id='game'>
              <div class='welcomeMessage'>
                <p>Start your game by entering a username</p>
              </div>
              <div class='loginForm'>
                <form action="/login" method="POST">
                  <input id="username" name="username" value="" placeholder="Enter username" pattern="[a-zA-Z0-9]+" minlength="3" maxlength="10"/>
                  <button id="loginBtn" type="submit">Login <img src="https://img.icons8.com/nolan/24/logout-rounded.png"/></button><br>
                  <label>* Username can contain only alpha-numeric letters with min length 3 and max length 10 </label>
                </form>
              </div>
          </div>
          <script>
            let input = document.querySelector("#username");
            let button = document.querySelector("#loginBtn");
            button.disabled = true;
            input.addEventListener("input", stateHandle);
            
            function stateHandle() {
                if(document.querySelector("#username").value === "") {
                    button.disabled = true;
                } else {
                    button.disabled = false;
                }
            }
          </script>
          </body>
        </html>
      `;
    },

    showResult: function(username, guesses, errormessage) {
      if (errormessage) {
        return `
          <div class="resultMessage">
              <p>${errormessage}</p>
          </div>
        `;
      } else if (Object.keys(guesses['guessedWords']).length === 0) {
        return `
          <div class="resultMessage">
              <p>Waiting for your guess....</p>
          </div>
          `;
      }else {
        const guessedWords = guesses['guessedWords']
        const word = Object.keys(guessedWords)[Object.keys(guessedWords).length - 1];
        const matches = guessedWords[word]['matches'];
        if (word.toLowerCase() != guesses['secretWord']) {
          return `
          <div class="resultMessage">
              <p>Your guess word '${word}' has ${matches} matches with the secret word!</p>
          </div>
        `;
        } else {
          const turns = guessedWords[word]['turns'];
          userinfo.newGame(username);
          return `
          <form action="/" method="POST">
            <div class="resultMessage">
                <p>Congrats! You successfully figured out the secret word <b>'${word}'</b> in ${turns} turns!</p>
            </div>
          </form>
          `;
        }
      }
    },

    getAllGuessedWords: function(guesses) {
      const guessedWords = guesses['guessedWords'];
      if (guessedWords) {
        return `<ul class="wordList">` +
        Object.keys(guessedWords).map( word => `
          <li>
            <div class="word">
              <p>In your #${guessedWords[word]['turns']} turn, the guess word '${word}' matches ${guessedWords[word]['matches']} letters.</p>
            </div>
          </li>
        `).join('') +
        `</ul>`;
      } else {
        return ``;
      }
      
    },

    getAllValidWords: function(words) {
      return `<div class="grid-container">` +
      Object.values(words).map( word => `
          <div class="grid-item">
            ${word}
          </div>
      `).join('') +
      `</div>`;
    },
};

  module.exports = wordleGameWeb;
  