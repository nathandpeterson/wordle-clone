import { handleInput } from './handleInput';

export function onKeyDown(event: KeyboardEvent) {
    const { key } = event;
    console.log('keydown backspace', key);
    handleInput(key);
};
