import React from "react";
import { useReducer } from "react";
import {reducer, initialState} from './reducer';
import AddToDoComp from "./AddToDoComp";
import LogoutComp from "./LogoutComp";

function ContentComp() {
    return (
        <div className="content">
              <div className="controls">
                <LogoutComp />
                <ul className="todos">
                { Object.values( action.todos ).map( function(todo) { 
                    return ( <li key={todo.id}> {todo.completed ? 'DONE: ' : ""} { todo.task } 
                     <button onClick={() => dispatch({ type: 'todos/deleteTodo' }) }>X</button><div></div>
                     <button onClick={() => dispatch({ type: 'todos/toggleTodo' }) }>Done/ Not-Done</button> </li> );
                    }) }
                </ul>
                <AddToDoComp />
              </div>
            </div>
    );
}

export default ContentComp;