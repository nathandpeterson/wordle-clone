import { get } from 'svelte/store';
import { answer } from '../store';

type HINT_TYPE = 'correct' | 'present' | 'absent';

// we only want to show one 'present' hint per number letter occurences
// remove letter from answer each time we provide a hint to avoid showing
// multiple 'present' hints when only one letter instance is present
// remove the first instance of a letter from an array of letters
const omitLetterFromWord = (letters: string[], letterToOmit: string) => {
	const indexToRemove = letters.findIndex(thisLetter => thisLetter === letterToOmit);
    return letters.filter((_, i) => i !== indexToRemove);
};
export const getHintsForGuess = (_guess: string) => {
    let guess = _guess.toUpperCase();
    const currentAnswer = get(answer);
    // use to only show one hint per letter from answer
    let wordLetters = currentAnswer.split('');
    let hints: HINT_TYPE[] = [];
    // we iterate through the guess twice to avoid providing
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === currentAnswer[i]) {
            hints[i] = 'correct';
            wordLetters = omitLetterFromWord(wordLetters, guess[i])
        }
    }
    for (let i = 0; i < guess.length; i++) {
        if (wordLetters.includes(guess[i])) {
            hints[i] = 'present';
            wordLetters = omitLetterFromWord(wordLetters, guess[i]);
        } else if (!hints[i]) {
            hints[i] = 'absent';
        }
    }
    return hints;
};
