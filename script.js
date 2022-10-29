const numberKeys = document.querySelectorAll('.number');
const operateKeys = document.querySelectorAll('.operate');
const clearKey = document.querySelector('.clear');
const convertKey = document.querySelector('.convert');
const percentKey = document.querySelector('.percent');
const equalKey = document.querySelector('.equal');

function add(num1, num2) {
	return +num1 + +num2;
}

function subtract(num1, num2) {
	return +num1 - +num2;
}

function multiply(num1, num2) {
	return +num1 * +num2;
}

function divide(num1, num2) {
	return +num1 / +num2;
}

function operate(operator, num1, num2) {
	switch (operator) {
        case '+':
			return add(num1, num2);
        case '-':
			return subtract(num1, num2);
        case '*':
			return multiply(num1, num2);
        case '/':
			return divide(num1, num2);
		default:
			break;
	}
}
