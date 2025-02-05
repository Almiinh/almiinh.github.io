/**
 * Returns an array of the first 'number' Fibonacci numbers.
 * @param {number} number
 * @returns Fibonacci's sequence
 */
function fibs(number) {
    if (number <= 0) return [];
    if (number === 1) return [0];
    if (number === 2) return [0, 1];

    const array = [0, 1];
    while (array.length < number) {
        array.push(array[array.length - 1] + array[array.length - 2]);
    }
    return array;
}

/**
 * Returns an array of the first 'number' Fibonacci numbers using recursion.
 * @param {number} number
 * @returns Fibonacci's sequence
 */
function fibsRec(number) {
    if (number <= 0) return [];
    if (number === 1) return [0];
    if (number === 2) return [0, 1];

    const array = fibsRec(number - 1);
    console.log("* Recursive call: fibsRec(" + (number - 1) + ")");
    return [...array, array[array.length - 1] + array[array.length - 2]];
}

export { fibs, fibsRec };
