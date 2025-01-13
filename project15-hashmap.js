function createHashMap(initialCapacity = 16, loadFactor = 0.75) {
    // Private variables
    let buckets = new Array(initialCapacity).fill(null).map(() => []);
    let capacity = initialCapacity;
    let size = 0;

    // Private hash function
    const hash = (key) => {
        if (typeof key !== 'string') {
            throw new Error('Keys must be strings');
        }

        let hashCode = 0;
        const primeNumber = 31;
        
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }

        return hashCode;
    };

    // Private resize method
    const resize = () => {
        const oldBuckets = buckets;
        capacity *= 2;
        buckets = new Array(capacity).fill(null).map(() => []);
        size = 0;

        // Rehash all existing entries
        for (const bucket of oldBuckets) {
            for (const [key, value] of bucket) {
                set(key, value);
            }
        }
    };

    // Public methods
    const set = (key, value) => {
        // Check if we need to resize
        if (size / capacity >= loadFactor) {
            resize();
        }

        const index = hash(key);
        const bucket = buckets[index];

        // Check if key already exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                // Update existing key
                bucket[i][1] = value;
                return;
            }
        }

        // Add new key-value pair
        bucket.push([key, value]);
        size++;
    };

    const get = (key) => {
        const index = hash(key);
        const bucket = buckets[index];

        for (const [storedKey, value] of bucket) {
            if (storedKey === key) {
                return value;
            }
        }

        return null;
    };

    const has = (key) => {
        const index = hash(key);
        const bucket = buckets[index];

        return bucket.some(entry => entry[0] === key);
    };

    const remove = (key) => {
        const index = hash(key);
        const bucket = buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                size--;
                return true;
            }
        }

        return false;
    };

    const length = () => size;

    const clear = () => {
        buckets = new Array(capacity).fill(null).map(() => []);
        size = 0;
    };

    const keys = () => {
        const allKeys = [];
        for (const bucket of buckets) {
            for (const [key] of bucket) {
                allKeys.push(key);
            }
        }
        return allKeys;
    };

    const values = () => {
        const allValues = [];
        for (const bucket of buckets) {
            for (const [, value] of bucket) {
                allValues.push(value);
            }
        }
        return allValues;
    };

    const entries = () => {
        const allEntries = [];
        for (const bucket of buckets) {
            for (const entry of bucket) {
                allEntries.push(entry);
            }
        }
        return allEntries;
    };

    // Return public interface
    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries
    };
}

// Export the factory function
export default createHashMap;


// import createHashMap from './HashMapFactory.js';

// Create a new HashMap instance
const test = createHashMap();

// Populate the hash map
const items = [
    ['apple', 'red'],
    ['banana', 'yellow'],
    ['carrot', 'orange'],
    ['dog', 'brown'],
    ['elephant', 'gray'],
    ['frog', 'green'],
    ['grape', 'purple'],
    ['hat', 'black'],
    ['ice cream', 'white'],
    ['jacket', 'blue'],
    ['kite', 'pink'],
    ['lion', 'golden']
];

// Set initial items
items.forEach(([key, value]) => test.set(key, value));

console.log('Initial length:', test.length()); // Should be 12

// Overwrite some existing keys
test.set('apple', 'green');
test.set('banana', 'brown');

console.log('Length after overwriting:', test.length()); // Still should be 12

// Add one more item to trigger resize
test.set('moon', 'silver');

console.log('Length after adding moon:', test.length()); // Should be 13

// Test other methods
console.log('Has "moon":', test.has('moon')); // true
console.log('Get "moon":', test.get('moon')); // 'silver'
console.log('Get non-existent key:', test.get('sun')); // null

// Remove a key
console.log('Remove "dog":', test.remove('dog')); // true
console.log('Length after removal:', test.length()); // Should be 12

// Get all keys, values, and entries
console.log('Keys:', test.keys());
console.log('Values:', test.values());
console.log('Entries:', test.entries());

// Clear the hash map
test.clear();
console.log('Length after clear:', test.length()); // Should be 0