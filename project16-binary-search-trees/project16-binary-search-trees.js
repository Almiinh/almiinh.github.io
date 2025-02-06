class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(array) {
        // Remove duplicates, sort the array
        const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(uniqueSortedArray);
    }

    // Build a balanced binary search tree
    buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        // Recursively build left and right subtrees
        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;
    }

    // Insert a new value into the tree
    insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.data) {
                if (!current.left) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else if (value > current.data) {
                if (!current.right) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            } else {
                // Value already exists, do nothing
                break;
            }
        }
    }

    // Find minimum value node in a subtree
    findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    // Delete a value from the tree
    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value) {
        if (!node) return null;

        // Traverse to find the node
        if (value < node.data) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else if (value > node.data) {
            node.right = this.deleteNode(node.right, value);
            return node;
        }

        // Node found, handle deletion cases
        // Case 1: No children
        if (!node.left && !node.right) return null;

        // Case 2: One child
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // Case 3: Two children
        const minRight = this.findMinNode(node.right);
        node.data = minRight.data;
        node.right = this.deleteNode(node.right, minRight.data);
        return node;
    }

    // Find a node with a specific value
    find(value) {
        let current = this.root;
        while (current) {
            if (value === current.data) return current;
            current = value < current.data ? current.left : current.right;
        }
        return null;
    }

    // Level-order traversal (breadth-first)
    levelOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        if (!this.root) return;

        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    // In-order traversal (left-root-right)
    inOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        const traverse = (node) => {
            if (!node) return;
            traverse(node.left);
            callback(node);
            traverse(node.right);
        };

        traverse(this.root);
    }

    // Pre-order traversal (root-left-right)
    preOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        const traverse = (node) => {
            if (!node) return;
            callback(node);
            traverse(node.left);
            traverse(node.right);
        };

        traverse(this.root);
    }

    // Post-order traversal (left-right-root)
    postOrder(callback) {
        if (!callback) throw new Error("Callback is required");

        const traverse = (node) => {
            if (!node) return;
            traverse(node.left);
            traverse(node.right);
            callback(node);
        };

        traverse(this.root);
    }

    // Calculate height of a node
    height(node) {
        if (!node) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Calculate depth of a node
    depth(node) {
        let depth = 0;
        let current = this.root;

        while (current !== node) {
            if (node.data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth++;
        }

        return depth;
    }

    // Check if tree is balanced
    isBalanced() {
        const checkBalance = (node) => {
            if (!node) return 0;

            const leftHeight = checkBalance(node.left);
            if (leftHeight === -1) return -1;

            const rightHeight = checkBalance(node.right);
            if (rightHeight === -1) return -1;

            if (Math.abs(leftHeight - rightHeight) > 1) return -1;

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return checkBalance(this.root) !== -1;
    }

    // Rebalance the tree
    rebalance() {
        const values = [];
        this.inOrder((node) => values.push(node.data));
        this.root = this.buildTree(values);
    }
}

// Pretty print function for tree visualization
export const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Main
export function generateRandomArray(count, max) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * max));
}

function test() {
    // Create BST with random numbers
    const randomArray = generateRandomArray(15, 100);
    const tree = new Tree(randomArray);

    console.log("Initial Tree:");
    prettyPrint(tree.root);

    console.log("\nIs Balanced:", tree.isBalanced());

    console.log("\nLevel Order:");
    tree.levelOrder((node) => console.log(node.data));

    console.log("\n\nPre Order:");
    tree.preOrder((node) => console.log(node.data));

    console.log("\n\nPost Order:");
    tree.postOrder((node) => console.log(node.data));

    console.log("\n\nIn Order:");
    tree.inOrder((node) => console.log(node.data));

    // Unbalance the tree
    console.log("\n\nAdding numbers > 100 to unbalance tree");
    [101, 102, 103, 104, 105].forEach((num) => tree.insert(num));

    console.log("\nIs Balanced:", tree.isBalanced());

    // Rebalance
    tree.rebalance();
    console.log("\nAfter Rebalancing:");
    prettyPrint(tree.root);

    console.log("\nIs Balanced:", tree.isBalanced());

    console.log("\nLevel Order:");
    tree.levelOrder((node) => console.log(node.data));

    console.log("\n\nPre Order:");
    tree.preOrder((node) => console.log(node.data));

    console.log("\n\nPost Order:");
    tree.postOrder((node) => console.log(node.data));

    console.log("\n\nIn Order:");
    tree.inOrder((node) => console.log(node.data));
}

export default { Tree, generateRandomArray, prettyPrint };

test();
