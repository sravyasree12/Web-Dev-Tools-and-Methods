export const addNoteToUsersList = ({ title, priority, descr }) => {
    return fetch(`/api/note/`, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ title, priority, descr }),
    })
        .catch(() => {
            Promise.reject({ error: "network error" });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(error => Promise.reject(error));
        })
};

export const checkSession = () => {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        });
};

export const createSession = ({ username }) => {
    return fetch('/api/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        });
};

export const endSession = () => {
    return fetch('/api/session', {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        });
}; 

export const deleteNote = (title) => {
    return fetch(`/api/note/${title}`, {
        method: 'DELETE',
    })
        .catch(() => {
            Promise.reject({ error: "network error" });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(error => Promise.reject(error));
        })
};