export const ADD_COUNTER = 'add_counter';

export function addCounter(value) {
    return {
        type: ADD_COUNTER,
        value
    }
}