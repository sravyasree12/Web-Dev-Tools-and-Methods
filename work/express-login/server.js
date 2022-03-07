const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;
const sessions = {};
const render = require('./render');
const updateIcon = "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/22/ffffff/external-edit-interface-kiranshastry-solid-kiranshastry-1.png";
const logoutIcon = "https://img.icons8.com/external-phatplus-solid-phatplus/22/ffffff/external-right-arrow-essential-phatplus-solid-phatplus.png";

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

//login and logout 
app.get('/', (req,res) => {
    const sid = req.cookies.sid;
    if(sid && sessions[sid]){
        const userName = sessions[sid].userName;
        res.send(render.loggedIn(userName, updateIcon, logoutIcon));
        return;
    }
    res.send(render.logInPage(logoutIcon));
});

app.post('/update', (req, res) => {
    const userName = sessions[req.cookies['sid']].userName;
    res.send(render.update(userName))
    });

app.get('/secret', (req, res) => {
    const sid = req.cookies.sid;
    if(!sid || !sessions[sid]){
        res.status(401).send('Go login!');
        return;
    }

    const userName = sessions[sid].userName;
    if(userName !== 'sravya'){
        res.status(403).send('This is private, stay out!');
        return;
    }

    res.send(`This is your space sravya`);

});

//redirect to login page
app.post('/login', (req,res) => {
    var userName = null;
    if (typeof req.body.userName === 'undefined') {
        userName = sessions[req.cookies['sid']].userName;
    } else {
        userName = req.body.userName.trim();
    }
    
    if(userName === 'dog' || !userName){
        res.status(403).send(`
        <h2>Redirect to Login page</h2>
            Invalid username<br>
            <form action="/" method="POST"> 
                <a href="http://localhost:${PORT}/">Login Here!</a>
            </form>
        `);
        res.redirect('/');
        return;
    }
    const sid = uuidv4();
    sessions[sid] = { 'userName': userName };
    res.cookie('sid', sid);
    res.redirect('/');
});

app.post('/logout', (req,res) => {
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));