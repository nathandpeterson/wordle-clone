import { get } from 'svelte/store';
import { answer } from '../store';

type HINT_TYPE = 'correct' | 'present' | 'absent';

export const getHintsForGuess = (_guess: string) => {
    let guess = _guess.toUpperCase();
    const currentAnswer = get(answer);
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
    return hints;
};
