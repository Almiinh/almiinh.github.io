import LinkedList from "./project14-linked-list.js";

var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

// Documentation
const __commands = {
    echo(...args) {
        this.echo(args.join(" "));
    },
    help() {
        this.echo(
            `This is a limited Javascript interpreter.\n` +
                `Available commands: ${__formatted_list}\n` +
                `<white>SHIFT+ENTER</white> to break lines.\n\n` +
                `JS <white>LinkedList</white> class method: \n` +
                `* <gold class=command>LinkedList()</gold>: class representing the full list\n` +
                __function_list +
                `\n`
        );
    },
    test() {
        const commands = [
            "const list = new LinkedList();",
            "list.append('dog');",
            "list.append('dog');",
            "list.append('cat');",
            "list.append('parrot');",
            "list.append('hamster');",
            "list.append('snake');",
            "list.append('turtle');",
            "list.toString();",
        ];

        const executeCommand = (index) => {
            if (index < commands.length) {
                __term.exec(commands[index]);
                setTimeout(() => executeCommand(index + 1), 200);
            }
        };

        executeCommand(0);
    },
};

const __formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
const __function_list = [
    ["append(value)", "adds a new node containing value to the end of the list"],
    ["prepend(value)", "adds a new node containing value to the start of the list"],
    ["size()", "returns the total number of nodes in the list"],
    ["at(index)", "returns the first node in the list"],
    ["pop()", "removes the last element from the list"],
    ["contains(value)", "returns true if the passed in value is in the list and otherwise returns false."],
    ["find(value)", "returns the index of the node containing value, or null if not found."],
    ["toString()", "represents your LinkedList objects as strings"],
    ["insertAt(value, index)", "inserts a new node with the provided value at the given index."],
    ["removeAt(index)", "removes the node at the given index."],
]
    .map(([cmd, desc]) => `* list.<cyan class="command">${cmd}</cyan>: ${desc}`)
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
                    this.echo(typeof result === "object" ? JSON.stringify(result) : new String(result));
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
            "<white>Welcome to this limited Javascript interpreter!\n Please enter commands to run the test with: <cyan>test</cyan>,</white>" +
            "or try to call <gold>LinkedList</gold> methods. Type <white>help</white> to list methods.\n\n" +
            "Examples:\n" +
            "const list = new LinkedList(); \n" +
            "list.append('dog');\n" +
            "list.append('cat');\n" +
            "list.toString()\n",
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
