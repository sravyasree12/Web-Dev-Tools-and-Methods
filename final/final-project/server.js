const uuid = require('uuid').v4;
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;
const session = require('./session');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required' });
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid' });
        return;
    }
    res.json(session.details[sid]);
});

app.post('/api/session', (req, res) => {
    const username = req.body.username;
    const { sid, error } = session.create({ username });
    setTimeout(() => {
        if (error) {
            return res.status(400).json(error);
        }
        res.cookie('sid', sid);
        res.json(session.details[sid]);
    }, 3000);
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    session.remove(sid);
    setTimeout(() => {
        res.clearCookie('sid');
        res.json({ sid, status: 'removed' });
    }, 3000)
});

app.post(`/api/note/`, (req, res) => {
    const { title, priority, descr } = req.body;
    const sid = req.cookies.sid;
    const id = uuid();

    if (!title) {
        return res.status(400).json({ error: "Title is empty" });
    }
    if (!descr) {
        return res.status(400).json({ error: "Description is empty" });
    }
    session.details[sid].info[title] = {
        id,
        title,
        priority,
        descr,
    }
    return res.json(session.details[sid]);
})

app.delete(`/api/note/:title`, (req, res) => {
    const title = req.params.title;
    const sid = req.cookies.sid;
    setTimeout(() => {
        if (!title) {
            return res.status(400).json({ error: "Missing Title!" });
        }
        delete session.details[sid].info[title];
        return res.json(session.details[sid].info);
    }, 1000);
})


app.get('/api/secret', (req, res) => {
    return res.json(session.details);
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));