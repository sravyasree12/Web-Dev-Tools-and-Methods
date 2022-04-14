const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const userinfo = require('./userinfo');
const words = require('./words');
const wordleGameWeb = require('./wordle-game-web'); 

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.json())

app.get('/', express.urlencoded({ extended: false }), (req, res) => {
	const {sid, username} = req.cookies;
	if (sid && username && userinfo.verifyUser({username:username, sid:sid})) {
        const {errormessage} = req.query;
        res.send(wordleGameWeb.gamePage({username:username, guesses:userinfo.userwords[username], errormessage:errormessage}));
	} else {
		res.send(wordleGameWeb.loginForm());
	}
});

app.post('/', express.urlencoded({ extended: false }), (req, res) => {
    const {username} = req.cookies;
    const guess = req.body.guess;
    if (userinfo.userwords[username]['guessedWords'][guess]) {
        res.redirect('/?errormessage=' + 'This word has been guessed! Try another one.');
    } else if (words.includes(guess.toLowerCase())) {
        userinfo.addUserGuessWord({username:username, guess:guess});
        res.redirect('/');
    } else {
        res.redirect('/?errormessage=' + 'Your input is not listed in the valid words list! Please select a valid one from the list.');
    }
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
	const username = req.body.username;
	const data = userinfo.userwords[username];
	if(!data && username && username != 'dog') {
		const uuidv4 = require('uuid').v4;
		const sid = uuidv4();
		res.cookie('sid', sid);
		res.cookie('username', username);
		userinfo.addUser({username:username, sid:sid});
        userinfo.newGame(username);
		res.redirect('/');
	} else if (data) {
		const uuidv4 = require('uuid').v4;
		const sid = uuidv4();
		res.cookie('sid', sid);
		userinfo.addUser({username:username, sid:sid});
		res.redirect('/');
	} else {
		res.status(403).send(`
			<h2>Redirect to Login page</h2>
			Invalid username<br>
			<form action="/" method="POST"> 
                <a href="http://localhost:${PORT}/">Login Here!</a>
            </form>
        `);
	}
}); 

app.post('/logout', express.urlencoded({ extended: false }), (req, res) =>{
	res.clearCookie('sid');
    res.redirect('/');
});

app.post('/new-game', express.urlencoded({ extended: false }), (req, res) => {
	const username = req.cookies.username;
	userinfo.newGame(username);
	res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
