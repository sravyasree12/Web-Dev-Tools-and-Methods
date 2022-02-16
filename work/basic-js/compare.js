"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) { 
    word = word.toLowerCase();
    guess = guess.toLowerCase();
    let count = 0;
    const guess_obj = guess.split("");
    for(let letter of word){
        //let idx = obj.includes(letter)
        let i = guess_obj.findIndex(s => s === letter);
        if(i != -1){
            count++;
            guess_obj.splice(i, 1);
        }
    }
    return count;
}


//References: 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
//https://stackoverflow.com/questions/55350674/how-to-count-common-characters-in-two-strings-in-javascript

