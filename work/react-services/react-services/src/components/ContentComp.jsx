import React from "react";
import AddToDoComp from "./AddToDoComp";
import LogoutComp from "./LogoutComp";

function ContentComp({onLogoutUsername, todos, addingToDo, onDeleteToDo, onUpdate}) {
    return (
        <div className="content">
                <div className="controls">
                    <LogoutComp onLogoutUsername= {onLogoutUsername}/>
                </div>
                <ul className="todos">
                { Object.values( todos ).map( function(todo) { 
                    return ( <li key={todo.id}> {todo.done ? 'DONE: ' : ""} { todo.task } 
                     <button onClick={() => { onDeleteToDo(todo.id);}}>X</button><div></div>
                     <button onClick={() => {onUpdate(todo.id, {done: !todo.done })}}>Done/ Not-Done</button> </li> );
                    }) }
                </ul>
                <AddToDoComp addingToDo={addingToDo}/> 
        </div>
    );
}

export default ContentComp;