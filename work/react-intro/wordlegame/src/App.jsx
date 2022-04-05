import './App.css';
import { useState } from 'react';
import PlayGame from './PlayGame';
import Results from './Results';

function App() {
  const [guessWord, setGuessWord] = useState();
  return (
    <div className="app">
      <Results guessWord={guessWord} />
      <PlayGame setGuessWord={setGuessWord} />
    </div>
  );
}

export default App;
