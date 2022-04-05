import { countMatches, hasSameLength, isWordValid } from './gameWordHelper';

const target = "RECAT";

function Results({ guessWord }) {
    let result = '';
    let resultClass = '';
    if (!guessWord) {
        result = 'Waiting for your guess..';
        resultClass = "waiting";
    } else if (!isWordValid(guessWord)) {
        result = `contains disallowed characters!`;
        resultClass = "invalid";
    } else if (guessWord.toLowerCase() === target.toLowerCase()) {
        result = `is the secret word! Good job!`;
        resultClass = "win";
    } else if (!hasSameLength(guessWord, target)) {
        result = `is not a valid word. Enter a valid word!`;
        resultClass = "invalid";
    } else {
        const matches = countMatches(guessWord, target);
        result = `has ${matches} letters in common. Keep going!`;
        resultClass = "match";
    }
    return (
        <div className="result">
            <div className={resultClass}>
                <span className="guess-word">{guessWord}</span>
                {result}
            </div>
        </div>
    );
};

export default Results;