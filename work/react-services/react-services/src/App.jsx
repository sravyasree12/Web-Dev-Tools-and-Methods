import { useState, useEffect } from 'react';
import {fetchAddTodo, fetchDeleteTodo, fetchUpdateTodo, fetchTodos, fetchSession, fetchLogout, fetchLogin} from './services';
import ContentComp from "./components/ContentComp";
import LoginComp from './components/LoginComp';

function App() {
    const [username, setUsername] = useState(''); 
    const [todos, setTodos] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('Loading...');
    const [deleteItem, setDeleteItem] = useState(0);
    const [updateItem, setUpdateItem] = useState(0);

    useEffect(function(){
        setIsLoading("Loading...");
        fetchSession()
        .then(function(session){
            setUsername(session.username);
            fetchTodos()
            .then(function(todos){
                setTodos(todos);
                setIsLoading('');
            })
        })
       }, 
       [deleteItem, updateItem]);

    function onLoginUsername(username){
        fetchLogin(username)
        .then(function(todos) {
            setUsername(username);
            setTodos(todos);
            setError('')
        })
        .catch ( function() {
            console.log('error')
        });  
    }


    function onLogoutUsername(){
        setUsername('');
        setTodos({});
        fetchLogout()
        .then(function() {
            setError('')
        })
        .catch(function() {
            setError('Logout Failed')
        });
    }

    function addingToDo(addToDo){
        fetchAddTodo(addToDo)
        .then(function(todo){
            setTodos({
                ...todos, 
                [todo.id]: todo,
            });
        })

    }

    function onDeleteToDo(idx){
        if(!idx){
            return;
        }
        fetchDeleteTodo(idx);
        setDeleteItem(deleteItem+1);
    }

    function onUpdate(idx, done){
        if(!idx){
            return;
        }
        fetchUpdateTodo(idx, done);
        setUpdateItem(updateItem+1);
    }

    return (
        <main className="">
            <div className="status">{error} {isLoading}</div>
            {!username && <LoginComp onLoginUsername= {onLoginUsername}/>}
            {username && <ContentComp onLogoutUsername= {onLogoutUsername} todos= {todos} addingToDo={addingToDo} onDeleteToDo={onDeleteToDo} onUpdate={onUpdate}/>} 
        </main>
    );
}

export default App;