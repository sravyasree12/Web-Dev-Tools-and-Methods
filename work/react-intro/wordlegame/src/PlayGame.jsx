import { useState } from 'react';

function PlayGame({ setGuessWord }) {
    const [input, setInput] = useState('');
    const updateInput = (e) => setInput(e.target.value);
    return (
        <div className="guess-form">
            <span>Your guess: </span>
            <input onChange={updateInput} value={input}></input>
            <button onClick={() => { setGuessWord(input); setInput('') }} disabled={input ? false : true}>GO</button>
        </div>
    );
};

export default PlayGame;