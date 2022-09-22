//Javascript

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const statsContainer = document.querySelector('.statsContainer');
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');


let workingExpression = '';
let storedExpression = '';
let currentOperator = '';
let lastPressed = '';

updateDisplay('0.0');

window.addEventListener('keydown', (e) => {
    if (e.key == 'd') {
        console.log(getComputedStyle(statsContainer).display);
        if (getComputedStyle(statsContainer).display == 'none') {
            statsContainer.style.cssText = "display: flex;";
        } else {
            statsContainer.style.cssText = "display: none;";
        }
    }
}, false);

buttons.forEach((button) => {
    button.addEventListener('click', updateButtons);
});

function updateButtons(event) {
    let pressedButton = event.srcElement.innerText;
    console.log("Current Pressed: " + pressedButton);
    console.log("lastPressed: " + lastPressed);
    console.log("working expression length: " + workingExpression.toString().length);


    if (pressedButton == "+/-") {
        workingExpression *= -1;
        updateDisplay(workingExpression);
    } else if (pressedButton == "." && !(workingExpression.includes('.'))) {
        if (workingExpression == '') {
            workingExpression = '0.';
            updateDisplay(workingExpression);
        } else {
            workingExpression += '.';
            updateDisplay(workingExpression);
        }
    } else if (/\d/.test(pressedButton) && workingExpression.toString().length < 11) {
        if (lastPressed == '=') {
            clear();
        }
        console.log("pressed");
        workingExpression += pressedButton;
        updateDisplay(workingExpression);
    } else if (/\/|\*|\\|\+|\-/.test(pressedButton)) {
        if (!(pressedButton == lastPressed)) {
            if (!(/\/|\*|\\|\+|\-/.test(lastPressed))) {
                    if (workingExpression && storedExpression) {
                        storedExpression = operate(currentOperator, storedExpression, workingExpression);
                        currentOperator = pressedButton;
                        workingExpression = '';
                        updateDisplay(storedExpression + " " + currentOperator);
                    } else { 
                        storedExpression = workingExpression;
                        workingExpression = '';
                        currentOperator = pressedButton;
                        updateDisplay(pressedButton);
                    }
            } else {
                currentOperator = pressedButton;
                updateDisplay(pressedButton);
            }
        }
    } else if (pressedButton == '=') {
        if (storedExpression) {
            workingExpression = operate(currentOperator, storedExpression, workingExpression);
            storedExpression = '';
            currentOperator = '';
            if (!(workingExpression.toString() === 'Infinity')) {
                updateDisplay(workingExpression);
            } else {
                updateDisplay("LOL no dividing by zero");
            }
        }
    } else if (pressedButton == 'C') {
        clear();
    }
    lastPressed = pressedButton;
    box1.innerText = "Working Expression: " + workingExpression;
    box2.innerText = "Stored Expression: " + storedExpression;
    box3.innerText = "Current Operator: " + currentOperator;
}

function updateDisplay(toBeDisplayed) {
    display.innerText = toBeDisplayed;
}

function clear() {
    console.log("clear");
    workingExpression = '';
    storedExpression = '';
    currentOperator = '';
    updateDisplay('0.0');
}

function operate(operator, firstNumber, secondNumber) {
    let result;

    if (operator == '+') {
        result = add(firstNumber, secondNumber);
    } else if (operator == '-') {
        result = subtract(firstNumber, secondNumber);
    } else if (operator == '*') {
        result = multiply(firstNumber, secondNumber);
    } else if (operator == '/') {
        result = divide(firstNumber, secondNumber);
    }

    if (result.toString().length > 10) {
        result = result.toExponential(4);
    }

    return result;
}


function add(firstNumber, secondNumber) {
    return +firstNumber + +secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return +firstNumber - +secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return +firstNumber * +secondNumber;
}

function divide(firstNumber, secondNumber) {
    return +firstNumber / +secondNumber;
}