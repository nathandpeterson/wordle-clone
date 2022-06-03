import { handleInput } from './handleInput';

export function onKeyDown(event: KeyboardEvent) {
    const { key } = event;
    handleInput(key);
};
