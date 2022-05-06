import {reducer, initialState} from './reducer';
import { useReducer } from "react";

function AddToDoComp() {
    const [addToDoItem, setAddToDoItem] = useState(0);
    return (
        <form action="#" onSubmit={(e) => e.preventDefault()}>
            <input onChange={ (e) => setAddToDoItem( e.target.value )} value= {addToDoItem}/>
            <button onClick={() => dispatch({ type: 'todos/addTodo' })}>ADD</button>
        </form>
    );
};

export default AddToDoComp;