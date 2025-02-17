import createHashMap from "./project15-hashmap.js";

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
                `JS <white>HashMap</white> class method: \n` +
                `* <cyan class="command">createHashMap()</cyan>\n` +
                __function_list +
                "\n"
        );
    },
    test() {
        const commands = [
            "// Create a new HashMap instance",
            "const map = createHashMap();",
            `// Populate the hash map`,
            `const items = [
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
];`,
            "// Set initial items",
            "items.forEach(([key, value]) => map.set(key, value))",
            "map.length() // Initial length should be 12",
            "// Overwrite some existing keys",
            "map.set('apple', 'green')",
            "map.set('banana', 'brown')",
            "map.length() // Length after overwriting, still should be 12",
            "// Add one more item to trigger resize",
            "map.set('moon', 'silver')",
            "map.length() // Length after adding moon, should be 13",
            "// Test other methods",
            `map.has('moon')`,
            `map.get('moon')`,
            `map.get('sun') // Get non-existent key:`,
            `// Remove a key`,
            `map.remove('dog')`,
            `map.length() // Length after removal, should be 12`,
            `// Get all keys, values and entries`,
            `map.keys()`,
            `map.values()`,
            `map.entries()`,
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
    ["set(key, value)", "assigns the value with the key in this map"],
    ["get(key)", "returns the value that is assigned to this key. If a key is not found, return null"],
    ["has(key)", "returns true or false whether or not the key is in the hash map"],
    ["remove(key)", "removes the entry with `key` and returns true, returns false if `key` isn't in the map"],
    ["length()", "returns the number of stored keys"],
    ["clear()", "removes all entries"],
    ["keys()", "returns an array containing all the keys"],
    ["values()", "returns an array containing all the values"],
    ["entries()", "returns an array that contains each key, value pair"],
]
    .map(([cmd, desc]) => `* map.<cyan class="command">${cmd}</cyan>: ${desc}.`)
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
            "Run the test with: <cyan>test</cyan>, or try to call <gold>HashMap</gold> methods. " +
            "Type <white>help</white> to list methods.\n\n" +
            "<gray>Example:\n" +
            "const map = createHashMap(); \n" +
            "map.set('apple', 'green');\n" +
            "map.get('moon');\n" +
            "map.values();</gray>\n",
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
