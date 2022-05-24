import * as backspace from '../assets/backspace.svg'

type keyDisplayType = 'string' | 'svg';

interface KeyData {
    value: string;
    type: keyDisplayType;
    display: string;
}

export const topRow: KeyData[] = [
    { value: 'Q', type: 'string', display: 'Q' },
    { value: 'W', type: 'string', display: 'W' },
    { value: 'E', type: 'string', display: 'E' },
    { value: 'R', type: 'string', display: 'R' },
    { value: 'T', type: 'string', display: 'T' },
    { value: 'Y', type: 'string', display: 'Y' },
    { value: 'U', type: 'string', display: 'U' },
    { value: 'I', type: 'string', display: 'I' },
    { value: 'O', type: 'string', display: 'O' },
    { value: 'P', type: 'string', display: 'P' },
];
export const midRow: KeyData[] = [
    { value: 'A', type: 'string', display: 'A' },
    { value: 'S', type: 'string', display: 'S' },
    { value: 'D', type: 'string', display: 'D' },
    { value: 'F', type: 'string', display: 'F' },
    { value: 'G', type: 'string', display: 'G' },
    { value: 'H', type: 'string', display: 'H' },
    { value: 'J', type: 'string', display: 'J' },
    { value: 'K', type: 'string', display: 'K' },
    { value: 'L', type: 'string', display: 'L' },
];

export const bottomRow: KeyData[] = [
    { value: 'Enter', type: 'string', display: 'ENTER' },
    { value: 'Z', type: 'string', display: 'Z' },
    { value: 'X', type: 'string', display: 'X' },
    { value: 'C', type: 'string', display: 'C' },
    { value: 'V', type: 'string', display: 'V' },
    { value: 'B', type: 'string', display: 'B' },
    { value: 'N', type: 'string', display: 'N' },
    { value: 'M', type: 'string', display: 'M' },
    { value: 'Backspace', type: 'svg', display: '←' }
];