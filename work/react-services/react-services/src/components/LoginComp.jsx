import { useState } from 'react';

function LoginComp({ onLoginUsername }) {
    const [username, setUsername] = useState('');
    const updateUsername = (e) => {setUsername(e.target.value); console.log(username)};
    return (
        <div className="guess-form">
            <span>Username: </span>
            <input onChange={updateUsername} value={username}></input>
            <button onClick={() => { onLoginUsername(username); setUsername('') }} disabled={username ? false : true}>LOGIN</button>
        </div>
    );
};

export default LoginComp;