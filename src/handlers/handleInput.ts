import { get } from 'svelte/store';
import { answer as answerStore, error, ERROR_TYPE, gameState, updateBestHintForLetter, winState } from '../store/';
import { getHintsForGuess } from '../utils';

const getIsAlphabetic = (s: string) => s.match(/[A-Za-z]/);

const getIsValidLength = (guess: string): boolean => (guess.length === 5);
const getIsValidWord = async (guess: string): Promise<boolean> => {
    const answer = get(answerStore);
    if (guess === answer) return true;
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`);
        const json = await res.json();
        if (json && json[0] && json[0].word) {
            return true;
        }
        return false;
    } catch (e) {
        console.log('error checking dictionary api', e);
        return false
    }

}

const handleError = (errorType: ERROR_TYPE) => {
    error.set(errorType);
    setTimeout(() => {
        error.set('');
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
            return handleError(ERROR_TYPE['NOT ENOUGH LETTERS']);
        };

        const isCurrentGuessValidWord = await getIsValidWord(currentGuess);
        if (!isCurrentGuessValidWord) {
           return handleError(ERROR_TYPE['NOT IN WORD LIST']);
        }
        const newGame = game.map((g, i) => {
            if (i === indexOfCurrentGuess) {
                return { ...g, submitted: true }
            }
            return g;
        });

        const hints = getHintsForGuess(currentGuess);

        currentGuess.split('').forEach((letter, i) => {
            updateBestHintForLetter(letter, hints[i]);
        })

        const answer = get(answerStore);
        if (currentGuess === answer) {
            winState.set(true);
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