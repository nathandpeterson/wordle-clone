import { guess } from '../store/';
import { onSubmit } from './onSubmit';

export function onKeyDown(event: KeyboardEvent, currentGuess: string, totalGuesses: number) {
    const { key } = event;
    const isAlphabetic = event.key.match(/[A-Za-z]/);
    
    if (key.length === 1 && isAlphabetic) {
        guess.update((g) => {
            if (g.length < 5) {
                return g + key;
            }
            return g;
        });
    } else if (key.match('Enter') && currentGuess.length === 5) {
        onSubmit(currentGuess, totalGuesses);
        guess.set('');
    } else {
        console.log('NO', key);
    }
};
