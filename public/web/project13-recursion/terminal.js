import { fibs, fibsRec } from "./project13-recursion.js";

var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

// Documentation
const __commands = {
    echo(...args) {
        this.echo(args.join(" "));
    },
    help() {
        this.echo(
            `This is a limited Javascript interpreter. \n` +
                `Available commands: ${__help_cmd_list}\n` +
                `<white>SHIFT+ENTER</white> to break lines.\n\n` +
                `JS functions: \n${__help_fn_list}\n` +
                "<gray>Examples: test, fibsRec(10), fibs(4)</gray>\n"
        );
    },
    test() {
        const commands = ["fibs(8)", "fibsRec(8)"];

        const executeCommand = (index) => {
            if (index < commands.length) {
                __term.exec(commands[index], { typing: true, delay: 1 });
                setTimeout(() => executeCommand(index + 1), 200);
            }
        };

        executeCommand(0);
    },
};

const __formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
const __function_list = [
    ["fibs(n)", "returns Fibonnaci's sequence at step n (imperative version)"],
    ["fibsRec(n)", "returns Fibonnaci's sequence at step n (recursive version)"],
];
const __command_list = ["clear"].concat(Object.keys(__commands));
const __help_fn_list = __function_list
    .map(([cmd, desc]) => `* <cyan class="command">${cmd}</cyan>: ${desc}`)
    .join("\n");
const __help_cmd_list = __formatter.format(
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
        completion: __command_list.concat(__function_list.map((row) => row[0].slice(0, -3))),
        checkArity: false,
        greetings:
            `<white>Welcome to this limited Javascript interpreter! Please enter commands and run the test with: <cyan>test</cyan></white>, ` +
            `or try to call <cyan>fibs</cyan> and <cyan>fibsRec</cyan> functions. \n` +
            `Type <white>help</white> for more information.\n\n` +
            `<gray>Example: test, fibsRec(10), fibs(4)</gray>`,
        keymap: {
            ENTER: function (e, original) {
                if (e.shiftKey) {
                    this.insert("\n");
                } else {
                    original.call(this, e);
                }
            },
        },
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

// On page load, focus on the terminal input and on pressing enter key, run the test command
window.onload = function () {
    __term.focus();
    document.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && document.activeElement === document.body) {
            __term.exec("test", { typing: true, delay: 1 });
            event.preventDefault();
        }
    });
};
