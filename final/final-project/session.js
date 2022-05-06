const uuid = require('uuid').v4;

const sessions = {}; 

// a blank place holder for the users list
const users = {
}

const isValidUsername = function (username) {

    if (!username) {
        return false;
    }

    const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');

    if (username !== cleanUsername) {
        return false;
    }
    return true;
}; 

const create = function ({ username }) {

    if (!username) {
        return { error: 'Please enter username' };
    }
    if (username.toLowerCase() === 'dog') {
        return { error: `Dog is Invalid Username. Please enter another username` }
    }
    if (!isValidUsername(username)) {
        return { error: 'Invalid Username...' };
    }

    const sid = uuid();

    users[username] = users[username] || { default: 'Empty Notes' };

    sessions[sid] = {
        sid,
        username,
        startTime: Date.now(),
        info: users[username],
    };
    return { sid };
}; 

const isValid = function (sid) {
    return !!sessions[sid];
};

const remove = function (sid) {
    delete sessions[sid];
};

module.exports = {
    details: sessions,
    create,
    remove,
    isValid,
};

