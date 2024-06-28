// FIELDS

let storedValue = '';      // number kept in memory during the input
let operator = '';          // Operator field
let afterEqual = false;
let afterOperator = false;

window.onload = handleClearDisplay

// #########
// BACK-END
// #########
// We use two fields to store the numbers: display and memory. They are updated each time there is an operation.


// When number button pressed
function handleNumber(digit) {
    const display = document.getElementById('display');

    // Input is cleared after equal
    if (afterEqual)
        handleClearDisplay()
    // Input is stored after operator
    if (afterOperator)
        storedValue = display.value

    // Case 1: Remove useless 0 on the left
    // Case 2: Clean display for new inputs (afterOperator and afterEqual)
    if (display.value == '0' || afterOperator || afterEqual)
        display.value = '';
    // Case 3: (After case 2) Number starts by '.'
    if (digit == '.' && display.value == '')
        digit = '0.';
    // Case 4: (End case) Number cannot contain two '.'
    if (digit === '.' && display.value.includes('.'))
        return

    display.value += digit;

    afterOperator = false
    afterEqual = false;
}

// When operator button pressed
function handleOperator(op) {
    const display = document.getElementById('display');

    // Case Number finishes with '.' like "12."
    if (display.value.endsWith('.')) {
        display.value = display.value.slice(0, -1)
    }

    // Case: Continuous calculation from previous operator
    if (!afterEqual && !afterOperator && operator !== '' && display.value !== '') {
        display.value = compute(operator, storedValue, display.value);
        storedValue = ''
    }

    operator = op
    document.getElementById('minidisplay').innerText = display.value + ' ' + operator;
    afterOperator = true
    afterEqual = false
}

// When '=' button pressed
function handleEqual() {
    if (operator !== '' && storedValue !== '') {
        const display = document.getElementById("display");

        // Case: Repeat Equal, swaps operands
        if (afterEqual) {
            const temp = display.value;
            display.value = storedValue;
            storedValue = temp;
        }

        // Update operands on minidisplay
        document.getElementById('minidisplay').innerText = storedValue + ' ' + operator + ' ' + display.value + ' =';

        // Compute then store previous inputs
        const result = compute(operator, storedValue, display.value);
        storedValue = display.value;
        display.value = result;

        // Update display
        display.value = result;

        afterEqual = true;
        afterOperator = false;
    }
}

// When button 'Delete' pressed
function handleDelete() {
    const display = document.getElementById('display')
    if (["Error", "Infinity", "NaN"].includes(display.value))
        handleClearDisplay()
    else
        display.value = display.value.slice(0, -1);
    if (display.value == '')
        display.value = '0';
}

// When button 'Clear' pressed
function handleClearDisplay() {
    storedValue = ''
    operator = '';
    document.getElementById('display').value = '0';
    document.getElementById('minidisplay').innerText = '';

}

// ##########
// OPERATIONS
// ##########

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    // if (b === 0) {
    //     return "Can't divide by zero"; // Handling division by zero
    // }
    return a / b;
}

// Operation hub
function compute(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return 'Error';
    }
}

// ###########
// KEYBINDINGS
// ###########


document.addEventListener('keydown', function(event) {

    switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            handleNumber(event.key);
            addHover(event.key)
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(event.key);
            event.preventDefault(); // Prevent default "/" behavior (Search in page)
            addHover(event.key)
            break;
        case 'Enter':
            handleEqual(); // Calculate the result
            event.preventDefault(); // Prevent default "Enter" behavior (like form submission)
            addHover('=')
            break;
        case 'Backspace':
            handleDelete(); // Delete the last character
            event.preventDefault(); // Prevent default "Backspace" behavior (navigating back)
            addHover('DEL')
            break;
        case 'Delete':
            handleClearDisplay(); // Clear the display
            addHover('C')
            break;
    }
});

function addHover(text) {
    const buttons = document.querySelectorAll('button'); // Get all button elements
    for (const button of buttons) {
        if (button.innerText.trim() === text.trim()) { // Compare innerText after trimming whitespace    

            button.classList.add('hover'); // Add the "hover" class that holds your hover styles
        
            setTimeout(() => {button.classList.remove('hover');}, 100); // Remove the class after 0.5 seconds (500 milliseconds)
        }
    }
}
