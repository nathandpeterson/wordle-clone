import { get } from 'svelte/store';
import { answer as answerStore, dialog, gameState, updateBestHintForLetter, winState } from '../store/';
import type { DIALOG_TYPE } from '../store/';
import { getHintsForGuess, WORDS } from '../utils';

const getIsAlphabetic = (s: string) => s.match(/[A-Za-z]/);

const getIsValidLength = (guess: string): boolean => (guess.length === 5);
const getIsValidWord = async (guess: string): Promise<boolean> => {
    const answer = get(answerStore);
    if (guess === answer) return true; 
    return WORDS.includes(guess.toLowerCase());
}

const setDialog = (dialogType: DIALOG_TYPE) => {
    dialog.set(dialogType);
    setTimeout(() => {
        dialog.set('CLEAR');
    }, 2000);
};

export const handleInput =  async (input: string) => {
    const isAlphabetic = getIsAlphabetic(input);
    if (!isAlphabetic) {
        return;
    };
    const game = get(gameState);
    const indexOfCurrentGuess = game.findIndex(g => g.submitted === false);

    if (input === 'Backspace') {
        const currentGuess = game[indexOfCurrentGuess].guess;
        const newGame = game.map((g, i) => {
            if (i === indexOfCurrentGuess) {
                return {
                    ...g,
                    guess: currentGuess.slice(0, currentGuess.length - 1),
                    submitted: false,
                }
            }
            return g;
        });
        gameState.set(newGame);
        return;
    } else if (input === 'Enter') {
        const currentGuess = game[indexOfCurrentGuess].guess;
        const isCurrentGuessValidLength = getIsValidLength(currentGuess);
        if (!isCurrentGuessValidLength) {
            return setDialog('NOT ENOUGH LETTERS');
        };

        const isCurrentGuessValidWord = await getIsValidWord(currentGuess);
        if (!isCurrentGuessValidWord) {
           return setDialog('NOT IN WORD LIST');
        }

        const hints = getHintsForGuess(currentGuess);

        currentGuess.split('').forEach((letter, i) => {
            updateBestHintForLetter(letter, hints[i]);
        })

        const newGame = game.map((g, i) => {
            if (i === indexOfCurrentGuess) {
                return { ...g, hints, submitted: true }
            }
            return g;
        });

        const answer = get(answerStore);
        if (currentGuess === answer) {
            setDialog('WIN');
            winState.set(true);
            gameState.set(newGame);
            return;
        }
        if (newGame.every(guess => guess.submitted === true)) {
            gameState.set(newGame);
            return setDialog('ANSWER');
        }
        gameState.set(newGame);

    } else if (input.length === 1 && game[indexOfCurrentGuess].guess.length < 5) {
        const uppercaseInput = input.toUpperCase();
        const newGame = game.map((g, i) => {
            if (i === indexOfCurrentGuess) return { ...g, guess: g.guess + uppercaseInput }
            return g;
        });
        gameState.set(newGame);
    }
};