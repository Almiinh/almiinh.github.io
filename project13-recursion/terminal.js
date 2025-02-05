import { fibs, fibsRec } from "./project13-recursion.js";

var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

// Documentation
const __commands = {
    echo(...args) {
        this.echo(args.join(" "));
    },
    test() {
        new Promise((resolve) => {
            resolve(__term.exec("fibsRec(8)", {typing:true, delay: 0.01}));
        }).then(() => __term.exec("fibs(8)",  {typing:true, delay: 0.01}) )
    },
};

const __formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
const __function_list = ["fibs()", "fibsRec()"].map((cmd) => `<cyan class="command">${cmd}</cyan>`);
const __command_list = ["clear", "help"].concat(Object.keys(__commands))
const __formatted_list = __command_list.map((cmd) => `<white class="command">${cmd}</white>`);
const help =
    `Available commands: ${__formatted_list}\n` +
    `Available JS functions: ${__formatter.format(__function_list)}\n` +
    "Example: test, fibsRec(10), fibs(4)\n";

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
        completion: __command_list,
        checkArity: false,
        greetings:
            "<white>Welcome to this limited Javascript interpreter! Run the test with: <cyan>test</cyan>, \nor try to call " +
            __formatter.format(__function_list) +
            " functions.</white>\nExample: test, fibsRec(10), fibs(4)\n",
        prompt: "> ",
    }
);

// Override console.log to redirect output to the terminal
console.log = function (...args) {
    const message = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg)).join(" ");
    __term.echo(message);
};
