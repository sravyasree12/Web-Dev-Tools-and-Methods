import { useState } from 'react';

function AddToDoComp({ addingToDo}) {
    const [addToDo, setAddToDo] = useState(''); 
    const updateToDo= (e) => {setAddToDo(e.target.value);};
    return (
        <form action="#" onSubmit={(e) => e.preventDefault()}>
            <input onChange={updateToDo} value={addToDo}/>
            <button onClick={() => { addingToDo(addToDo); setAddToDo('') }} disabled={addToDo ? false : true}>ADD</button>
        </form>
    );
};

export default AddToDoComp;