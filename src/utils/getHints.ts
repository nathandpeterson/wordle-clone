import { get } from 'svelte/store';
import { answer } from '../store';

type HINT_TYPE = 'correct' | 'present' | 'absent';

// we only want to show one 'present' hint per number letter occurences
// remove letter from answer each time we provide a hint to avoid showing
// multiple 'present' hints when only one letter instance is present
const omitLetterByIndex = (word: string, index: number) => {
    return word.slice(0, index) + word.slice(index);
}

export const getHintsForGuess = (_guess: string) => {
    let guess = _guess.toUpperCase();
    const currentAnswer = get(answer);
    // use to only show one hint per letter from answer
    let wordLetters = currentAnswer;
    let hints: HINT_TYPE[] = [];
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === currentAnswer[i]) {
            hints = [...hints, 'correct'];
            wordLetters = omitLetterByIndex(wordLetters, i)
        } else if (currentAnswer.includes(guess[i])) {
            hints = [...hints, 'present']
            wordLetters = omitLetterByIndex(wordLetters, i);
        } else {
            hints = [...hints, 'absent']
        }
    }
    return hints;
};
