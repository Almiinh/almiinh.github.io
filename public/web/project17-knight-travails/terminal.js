import { knightMoves } from "./project17-knight-travails.js";
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
                `JS function:\n` +
                __function_list +
                "\n"
        );
    },
    test() {
        const commands = [
            $.terminal.escape_formatting("const solution = knightMoves([3,3],[4,3])"),
            "console.log(`=> You made it in ${solution.length - 1} moves! Here is your path:`)",
            "solution.array.forEach(element => {\n" + "    console.log('  '+JSON.stringify(cell)\n" + "});",
        ];

        const executeCommand = (index) => {
            if (index < commands.length) {
                __term.exec((commands[index]));
                setTimeout(() => executeCommand(index + 1), 200);
            }
        };

        executeCommand(0);
    },
};

const __formatter = new Intl.ListFormat("en", { style: "long", type: "conjunction" });
const __function_list = [
    [
        $.terminal.escape_formatting("knightMoves(start=[x, y], end=[x,y])"),
        "shows the shortest possible way to get from one square to another",
    ],
]
    .map(([cmd, desc]) => `* <cyan class="command">${cmd}</cyan>: ${desc}.`)
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
        completion: [...__command_list, "knightMoves"],
        checkArity: false,
        greetings:
            "<white>Welcome to this limited Javascript interpreter!</white>\n" +
            "Run the test with: <cyan>test</cyan>, or try to call <cyan>knightMoves</cyan> function. " +
            "Type <white>help</white> for more info.\n\n" +
            "<gray>Example:\n" +
            $.terminal.escape_formatting("knightMoves([1,2], [3,4])") +
            "</gray>\n",
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
