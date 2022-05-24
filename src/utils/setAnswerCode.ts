import { answer } from '../store';
import { getRandomWord } from './words';

export const setAnswerCode = (code: string | null) => {
    if (!code) {
        answer.set(getRandomWord())
        return;
    }
    try {
        const string = atob(code);
        console.log('string', string);
        const json = JSON.parse(string);
        if (Array.isArray(json)) {
            console.log('json', json);
            answer.set(json[0]);
            //todo - push any other answers onto stack
        }
    } catch(e) {
        answer.set(getRandomWord())
    }
};