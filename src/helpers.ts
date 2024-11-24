import { DisplayAlertProps } from './types';

export const isDisplayAlertObject = (obj: any): obj is DisplayAlertProps => 
    typeof obj === 'object' && 
    obj !== null && 
    typeof obj.message === 'string';

export function delay(fn: () => void, ms: number) {
    return setTimeout(fn, ms);
}

export function joinStrings(...strings: string[]): string {
    return strings.join(' ');
}
