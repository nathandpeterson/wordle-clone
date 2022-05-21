
type HINT_TYPE = 'RIGHT_LETTER_RIGHT_POSITION' | 'RIGHT_LETTER_WRONG_POSITION' | 'WRONG_LETTER';

let cache: any = {};

export const clearCache = () => {
    cache = {};
}

export const getHintsForGuess = (guess: string, answer: string) => {
    // check to see if we have already computed the hints for this guess
    if (cache[`${guess}-${answer}`]) {
        return cache[`${guess}-${answer}`]
    }

    let hints: HINT_TYPE[] = [];
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === answer[i]) {
            hints = [...hints, 'RIGHT_LETTER_RIGHT_POSITION']
        } else if (answer.includes(guess[i])) {
            hints = [...hints, 'RIGHT_LETTER_WRONG_POSITION']
        } else {
            hints = [...hints, 'WRONG_LETTER']
        }
    }
    // add the result to cache so we don't have to compute again
    cache[`${guess}-${answer}`] = hints;
    return hints;
};
