import { writable } from 'svelte/store';

export const guess = writable('');
export const totalGuesses = writable(0);

const answer = 'MUTTI';

interface Guess {
    value: string;
    submitted: boolean;   
}

interface Game {
    guesses: Guess[];
}

// export * from './guessStore';
// guess - what is the current guess?
// guesses - how many guesses has the user submitted?
// answer - what is the answer?