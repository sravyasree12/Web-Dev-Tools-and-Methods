import {reducer, initialState} from './reducer';
import { useReducer } from "react";
import { useState} from 'react';

function LoginComp({username, isLoggedIn, }) {
    const [username, setUsername] = useState(''); 
    return (
        <div className="login-form">
            <span>Username: </span>
            <input onChange={ (e) => setUsername( e.target.value )} value= {username} />
            <button onClick={() => dispatch({ type: 'todos/login'})}>LOGIN</button>
        </div>
    );
};

export default LoginComp;