import { derived, writable } from 'svelte/store';

type HINT_TYPE = 'correct' | 'present' | 'absent';

export enum ERROR_TYPE { 'NOT ENOUGH LETTERS', 'NOT IN WORD LIST'}

export const error = writable<ERROR_TYPE | ''>('');
export const answer = writable<string>('');
export const winState = writable<boolean>(false);

interface Guess {
    guess: string;
    submitted: boolean; 
}   

type Game = Guess[];

export const gameState = writable<Game>([
    { guess: '', submitted: false },
    { guess: '', submitted: false },
    { guess: '', submitted: false },
    { guess: '', submitted: false },
    { guess: '', submitted: false },
    { guess: '', submitted: false }
]);

// return index of first guess that has not been submitted
export const getCurrentGuessIndex = derived(gameState, $gameState => {
    return $gameState.findIndex(guess => guess.submitted === false);
});

export const getCurrentGuess = derived(gameState, $gameState => {
    return $gameState.find(guess => guess.submitted === false);
});

// return array of all guess strings that have been submitted
export const getAllSubmittedGuesses = derived(gameState, $gameState => {
    return $gameState.filter(g => g.submitted === true).map(g => g.guess);
});

type BestHintForLetter = { [key: string]: HINT_TYPE };

export const bestHintForLetter = writable<BestHintForLetter>({});

const hintsByPriority: HINT_TYPE[] = ['absent', 'present', 'correct'];
const getHintPriority = (hintToCheck: HINT_TYPE) =>
    hintsByPriority.findIndex(hint => hint === hintToCheck);

export const updateBestHintForLetter = (letter: string, newHint: HINT_TYPE) => {
    bestHintForLetter.update(hintsByLetter => {
        let oldHint = hintsByLetter[letter];
        if (!oldHint) {
            hintsByLetter[letter] = newHint
        } else {
            const oldHintPriority = getHintPriority(hintsByLetter[letter]);
            const newHintPriority = getHintPriority(newHint);
            hintsByLetter[letter] = newHintPriority > oldHintPriority ? newHint : oldHint;
        }
        return hintsByLetter;
    });
};