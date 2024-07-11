/**
 * Checks if a value is an array.
 *
 * @param {Array<any>} array Array to check.
 * @returns {void} Throws an error if the provided value is not an array.
 */
function checkArray(array: any[]): void {
    if (!Array.isArray(array)) {
        throw new Error("Provided value is not an array.");
    }
}

/**
 * Shuffles an array.
 *
 * @param {Array<any>} array Array to shuffle elements in.
 * @returns {any[]} Shuffled Array
 */
export function shuffleArray(array: any[]): any[] {
    checkArray(array);
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Chunks an array into smaller arrays.
 *
 * @param {Array<any>} array Array to chunk.
 * @param {number} chunkSize Size of each chunk.
 * @returns {any[][]} Chunked Array
 */
export function chunkArray(array: any[], chunkSize: number): any[][] {
    checkArray(array);
    if (typeof chunkSize !== "number")
        throw new Error("Chunk size must be a number.");
    const chunked = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunked.push(array.slice(i, i + chunkSize));
    }
    return chunked;
}

/**
 * Removes duplicate elements from an array.
 *
 * @param {Array<any>} array Array to remove duplicates from.
 * @returns {any[]} Array without duplicates
 */
export function removeDuplicates(array: any[]): any[] {
    checkArray(array);
    return [...new Set(array)];
}

/**
 * Flattens a multi-dimensional array.
 *
 * @param {Array<any>} array Array to flatten.
 * @returns {any[]} Flattened Array
 */
export function flattenArray(array: any[]): any[] {
    checkArray(array);
    return array.flat(Infinity);
}

/**
 * Filters out falsy values from an array.
 *
 * @param {Array<any>} array Array to filter.
 * @returns {any[]} Filtered Array
 */
export function filterFalsy(array: any[]): any[] {
    checkArray(array);
    return array.filter(Boolean);
}

/**
 * Trims an array to a specified length.
 *
 * @param {Array<any>} array Array to trim.
 * @param {number} [maxLength=10] Maximum length of the array.
 * @returns {any[]} Trimmed Array
 */
export function trimArray(array: any[], maxLength: number = 10): any[] {
    checkArray(array);
    if (typeof maxLength !== "number")
        throw new Error("Maximum length must be a number.");
    if (array.length > maxLength) {
        const len = array.length - maxLength;
        array = array.slice(0, maxLength);
        array.push(`...${len} more`);
    }
    return array;
}

/**
 * Checks if two arrays are equal.
 *
 * @param {Array<any>} array1 First array to compare.
 * @param {Array<any>} array2 Second array to compare.
 * @returns {boolean} Whether the arrays are equal or not.
 */
export function isEqualArray(array1: any[], array2: any[]): boolean {
    checkArray(array1);
    checkArray(array2);
    return (
        array1.length === array2.length &&
        array1.every((value, index) => value === array2[index])
    );
}

/**
 * Make a list of elements of an array.
 *
 * @param {Array<any>} arr Array of elements to list.
 * @param {string} [conj="and"] Conjunction to use.
 * @returns {string} List of elements
 */
export function list(arr: any[], conj: string = "and"): string {
    checkArray(arr);
    if (typeof conj !== "string")
        throw new Error("Conjunction must be a string.");
    const len = arr.length;
    if (len === 0) return "";
    if (len === 1) return arr[0];
    return `${arr.slice(0, -1).join(", ")}${len > 1 ? `${len > 2 ? "," : ""} ${conj} ` : ""}${arr.slice(-1)}`;
}

/**
 * Get a random element from an array.
 *
 * @param {Array<any>} array Array to get a random element from.
 * @returns {any} Random element
 */
export function randomArrayElement(array: any[]): any {
    checkArray(array);
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get the most common element in an array.
 *
 * @param {Array<any>} array Array to get the most common element from.
 * @returns {any} Most common element
 */
export function mostCommonElement(array: any[]): any {
    checkArray(array);
    return array
        .sort(
            (a, b) =>
                array.filter((v) => v === a).length -
                array.filter((v) => v === b).length,
        )
        .pop();
}

/**
 * Get the least common element in an array.
 *
 * @param {Array<any>} array Array to get the least common element from.
 * @returns {any} Least common element
 */
export function leastCommonElement(array: any[]): any {
    checkArray(array);
    return array
        .sort(
            (a, b) =>
                array.filter((v) => v === b).length -
                array.filter((v) => v === a).length,
        )
        .pop();
}

/**
 * Sort an array of strings alphabetically.
 *
 * @param {Array<String>} array Array of string to sort.
 * @returns {Array<String>} Sorted Array
 */
export function sortByName(array: string[]): string[] {
    checkArray(array);
    if (array.some((item) => typeof item !== "string")) {
        throw new Error("Array must contain only strings.");
    }
    return array.sort((a, b) => a.localeCompare(b));
}

/**
 * Sort an array of numbers in ascending order.
 *
 * @param {Array<Number>} array Array of numbers to sort.
 * @returns {Array<Number>} Sorted Array
 */
export function sortByNumber(array: number[]): number[] {
    checkArray(array);
    if (array.some((item) => typeof item !== "number")) {
        throw new Error("Array must contain only numbers.");
    }
    return array.sort((a, b) => a - b);
}
