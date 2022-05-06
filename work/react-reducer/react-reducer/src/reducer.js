export const initialState = {
    isLoggedIn: false,
    username: '',
    todos: [{
        id:'0',
        task: 'Eat',
        completed: false,
    },
    {
        id:'1',
        task: 'Sleep',
        completed: false,
    },
    {
        id:'2',
        task: 'Repeat',
        completed: true,
    }],
    isLoginDisabled: true,
    errorStatus: '',
};

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
};

export function reducer(state = initialState, action){
    switch(action.type){
        case 'todos/login':
            return{
                ...state,
                isLoggedIn: true,
                username: action.username,
                todos: action.todos,
                isLoginDisabled: false,
                errorStatus: '',
            };

        case 'todos/logout':
            return{
                ...state,
                isLoggedIn: false,
                username: '',
                todos: {
                    ...state.todos,
                },
            };

        case 'todos/toggleTodo':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id !== action.payload) {
                        return todo
                    }
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                })
            };

        case 'todos/addTodo':
            return{
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: nextTodoId(state.todos),
                        task: action.payload,
                        completed: false,
                    }
                ]
            };

        case 'todos/deleteTodo':
            const newTodos = { ...state.todos };
            delete newTodos[action.id];
            return {
                ...state,
                todos: {
                    ...newTodos
                },
            };
        
        default:
            return state;
    }
}