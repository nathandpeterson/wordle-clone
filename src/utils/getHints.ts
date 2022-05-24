import { get } from 'svelte/store';
import { answer } from '../store';

type HINT_TYPE = 'correct' | 'present' | 'absent';

let cache: any = {};

export const clearCache = () => {
    cache = {};
}

export const getHintsForGuess = (guess: string) => {
    const currentAnswer = get(answer);
    // check to see if we have already computed the hints for this guess
    if (cache[`${guess}-${currentAnswer}`]) {
        return cache[`${guess}-${currentAnswer}`]
    }

    let hints: HINT_TYPE[] = [];
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === currentAnswer[i]) {
            hints = [...hints, 'correct']
        } else if (currentAnswer.includes(guess[i])) {
            hints = [...hints, 'present']
        } else {
            hints = [...hints, 'absent']
        }
    }
    // add the result to cache so we don't have to compute again
    cache[`${guess}-${answer}`] = hints;
    return hints;
};
