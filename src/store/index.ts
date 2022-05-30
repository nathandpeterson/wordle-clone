import { derived, writable } from 'svelte/store';
import { getRandomWord } from '../utils';

type HINT_TYPE = 'correct' | 'present' | 'absent';

export type DIALOG_TYPE = 'NOT ENOUGH LETTERS' | 'NOT IN WORD LIST' | 'ANSWER' | 'WIN' | 'CLEAR';

export enum WIN_MESSAGE {
    'GENIUS', 'MAGNIFICENT', 'IMPRESSIVE', 'SPLENDID', 'GREAT', 'PHEW'
}

export const dialog = writable<DIALOG_TYPE>('CLEAR');
export const answer = writable<string>('');
export const winState = writable<boolean>(false);

interface Guess {
    guess: string;
    submitted: boolean;
    hints: HINT_TYPE[];
}   

type Game = Guess[];

const initialGameState = [
    { guess: '', hints: [], submitted: false },
    { guess: '', hints: [], submitted: false },
    { guess: '', hints: [], submitted: false },
    { guess: '', hints: [], submitted: false },
    { guess: '', hints: [], submitted: false },
    { guess: '', hints: [], submitted: false }
];

export const gameState = writable<Game>(initialGameState);

export const currentRowIndex = derived(gameState, $gameState => 
    $gameState.findIndex(guess => guess.submitted === false));

export const isGameOver = derived([gameState, winState], ([$gameState, $winState]) => {
    if ($gameState.every(guess => guess.submitted === true)) {
        return true;
    }
    return $winState;
});

export const restartGame = () => {
    gameState.set(initialGameState);
    winState.set(false);
    answer.set(getRandomWord());
};

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