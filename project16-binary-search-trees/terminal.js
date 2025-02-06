import { Tree, generateRandomArray, prettyPrint } from "./project16-binary-search-trees.js";

var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

// Documentation
const __commands = {
    echo(...args) {
        this.echo(args.join(" "));
    },
    help() {
        this.echo(
            `Available commands: ${__formatted_list}.\n` +
                `<white>SHIFT+ENTER</white> to break lines.\n\n` +
                `JS <white>Tree</white> class method: \n` +
                `* <cyan class="command">Tree()</cyan>\n` +
                __function_list +
                "\n"
        );
    },
    test() {
        const commands = [
            "// Create BST with random numbers",
            "const randomArray = generateRandomArray(15, 100)",
            "const tree = new Tree(randomArray)",
            "prettyPrint(tree.root) // Initial Tree",
            'tree.isBalanced()',
            "tree.levelOrder((node) => console.log(node.data)) // Level Order",
            "tree.preOrder((node) => console.log(node.data)) // Pre Order",
            "tree.postOrder((node) => console.log(node.data)) // Post Order",
            "tree.inOrder((node) => console.log(node.data)) // In Order",
            "[101, 102, 103, 104, 105].forEach((num) => tree.insert(num)) // Adding numbers > 100 to unbalance tree",
            'tree.isBalanced() // Is Balanced',
            "tree.rebalance() // Rebalance",
            '// After Rebalancing',
            "prettyPrint(tree.root)",
            'tree.isBalanced() // Is Balanced',
            "tree.levelOrder((node) => console.log(node.data)) // Level Order",
            "tree.preOrder((node) => console.log(node.data)) // Pre Order",
            "tree.postOrder((node) => console.log(node.data)) // Post Order",
            "tree.inOrder((node) => console.log(node.data)) // In Order",
        ];

        const executeCommand = (index) => {
            if (index < commands.length) {
                __term.exec(commands[index]);
                setTimeout(() => executeCommand(index + 1), 100);
            }
        };

        executeCommand(0);
    },
};

const __formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
const __function_list = [
    ["buildTree(array)", "Build a balanced binary search tree"],
    ["insert(value)", "Insert a new value into the tree"],
    ["findMinNode(node)", "Find minimum value node in a subtree"],
    ["deleteItem(value)", "Delete a value from the tree"],
    ["find(value)", "Find a node with a specific value"],
    ["levelOrder(callback)", "Level-order traversal (breadth-first)"],
    ["inOrder(callback)", "In-order traversal (left-root-right)"],
    ["preOrder(callback)", "Pre-order traversal (root-left-right)"],
    ["postOrder(callback)", "Post-order traversal (left-right-root)"],
    ["height(node)", "Calculate height of a node"],
    ["depth(node)", "Calculate depth of a node"],
    ["isBalanced()", "Check if tree is balanced"],
    ["rebalance()", "Rebalance the tree"],
]
    .map(([cmd, desc]) => `* tree.<cyan class="command">${cmd}</cyan>: ${desc}.`)
    .join("\n");
const __command_list = ["clear"].concat(Object.keys(__commands));
const __formatted_list = __formatter.format(
    __command_list.map((cmd) => `<white class="command">${cmd}</white>`)
);

const __term = $("#cli").terminal(
    function (command) {
        if (command !== "" && __commands[command]) {
            // Execute predefined command
            const result = __commands[command].call(this);
            if (result !== undefined) {
                this.echo(new String(result));
            }
        } else if (command !== "") {
            // Evaluate as JavaScript code
            try {
                var result = __EVAL(command);
                if (result !== undefined) {
                    this.echo(
                        $.terminal.escape_formatting(
                            typeof result === "object" ? JSON.stringify(result) : new String(result)
                        )
                    );
                }
            } catch (e) {
                this.error(new String(e));
            }
        }
    },
    {
        tabCompletion: true,
        completion: __command_list,
        checkArity: false,
        greetings:
            "<white>Welcome to this limited Javascript interpreter!</white>\n" +
            "Run the test with: <cyan>test</cyan>, or try to call <gold>Tree</gold> methods. " +
            "Type <white>help</white> to list methods.\n\n" +
            "<gray>Example:\n" +
            $.terminal.escape_formatting("const tree = new Tree([1, 2, 3, 4, 5])\n") +
            "tree.insert(6)\n" +
            "tree.find(6);\n" +
            "tree.isBalanced()</gray>\n",
        prompt: "> ",
    }
);

// Enable syntax highlighting for JavaScript
$.terminal.syntax("js");

$.terminal.prism_formatters = {
    prompt: true,
    echo: false,
    animation: true, // will be supported in version >= 2.32.0
    command: true,
};

// Override console.log to redirect output to the terminal
console.log = function (...args) {
    const message = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(" ");
    __term.echo(message);
};
