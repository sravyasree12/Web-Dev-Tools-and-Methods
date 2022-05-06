import {reducer, initialState} from './reducer';
import { useReducer } from "react";

function LogoutComp() {
    return (
        <div className="logout">
            <button onClick={() => dispatch({ type: 'todos/logout' }) }>LOGOUT</button>
        </div>
    );
};

export default LogoutComp;