//Javascript

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const toBeEvaluated = ['', ''];

buttons.forEach((button) => {
    button.addEventListener('click', updateButtons);
});

function updateButtons(event) {
    let pressedButton = event.srcElement.innerText;
    console.log(pressedButton);

    if (toBeEvaluated[0].length < 10) {
        if (pressedButton == "+/-") {
            toBeEvaluated[0] *= -1;
        } else if (pressedButton == "." && !(toBeEvaluated[0].includes('.'))) {
            if (toBeEvaluated[0] == '') {
                toBeEvaluated[0] = '0.';
            } else {
                console.log('not empty');
                toBeEvaluated[0] += '.';
            }
        } else if (/\d/.test(pressedButton)) {
            toBeEvaluated[0] += pressedButton;
        } else if (pressedButton == 'C') {
            toBeEvaluated[0] = '';
        } else if (/\/|\*|\\|\+|\-/.test(pressedButton)) {
            toBeEvaluated[1] = toBeEvaluated[0];
            toBeEvaluated[0] = '';
            toBeEvaluated[3] = pressedButton;
        } else if (pressedButton == '=') {
            toBeEvaluated[0] = operate(toBeEvaluated[3], toBeEvaluated[1], toBeEvaluated[0]);
        }
    }
    display.innerText = toBeEvaluated[0];
}

function operate(operator, firstNumber, secondNumber) {
    if (operator == '+') {
        return add(firstNumber, secondNumber);
    } else if (operator == '-') {
        return subtract(firstNumber, secondNumber);
    } else if (operator == '*') {
        return multiply(firstNumber, secondNumber);
    } else if (operator == '/') {
        return divide(firstNumber, secondNumber);
    }
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