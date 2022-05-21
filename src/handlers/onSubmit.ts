import { totalGuesses as totalGuessesStore } from "../store";

export function onSubmit(currentGuess: string, totalGuesses: number) {
    if (currentGuess.length === 5) {
        console.log('SUBMIT GUESS', currentGuess);
        totalGuessesStore.update((num) => {
            console.log('total guesses store num', num)
            return num += 1
        });
    } else {
        console.log('NOT ENOUGH LETTERS');
    }
};