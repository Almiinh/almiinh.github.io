import LinkedList from "./project14-linked-list.js";

var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

// Documentation
const __commands = {
    echo(...args) {
        this.echo(args.join(" "));
    },
    test() {
        new Promise((resolve) => {
            resolve(__term.exec("const list = new LinkedList();", { typing: true, delay: 1 }));
        })
            .then(() => {
                __term.exec("list.append('dog');");
                __term.exec("list.append('dog');");
                __term.exec("list.append('cat');");
                __term.exec("list.append('parrot');");
                __term.exec("list.append('hamster');");
                __term.exec("list.append('snake');");
                __term.exec("list.append('turtle');");
            })
            .then(() => __term.exec("list.toString();", { typing: true, delay: 1 }));
    },
};

const __formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
const __function_list = [
    "append(value)",
    "prepend(value)",
    "size()",
    "at(index)",
    "pop()",
    "contains(value)",
    "find(value)",
    "toString()",
    "insertAt(value, index)",
    "removeAt(index)",
].map((cmd) => `* list.<cyan class="command">${cmd}</cyan>`).join('\n');
const __command_list = ["clear", "help"].concat(Object.keys(__commands))
const __formatted_list = __formatter.format(__command_list.map((cmd) => `<white class="command">${cmd}</white>`));
const help =
    `Available commands: ${__formatted_list}\n` +
    "JS <hite>LinkedList</white> class method: \n" +
    __function_list +
    "\n\n" +
    "Example:\n\n" +
    "const list = new LinkedList(); \n" +
    "list.append('dog');\n" +
    "list.append('cat');\n" +
    "list.toString()";

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
                    if (typeof result === "object") {
                        this.echo(JSON.stringify(result));
                    } else {
                        this.echo(new String(result));
                    }
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
            "<white>Welcome to this limited Javascript interpreter! Run the test with: <cyan>test</cyan>, " +
            "or try to call <cyan>LinkedList</cyan> methods.</white>\n" +
            "Type <white>help</white> to list methods\n\n" +
            "Example:\n" +
            "const list = new LinkedList(); \n" +
            "list.append('dog');\n" +
            "list.append('cat');\n" +
            "list.toString()\n",
        prompt: "> ",
    }
);

// Override console.log to redirect output to the terminal
console.log = function (...args) {
    const message = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(" ");
    __term.echo(message);
};
