const numberKeys = document.querySelectorAll('.number');
const operateKeys = document.querySelectorAll('.operate');
// const operateKeysPushedAlready = document.querySelectorAll('.pushed-operate');

const display = document.querySelector('.calculator-screen');

const clearKey = document.querySelector('.clear');
const convertKey = document.querySelector('.convert');
const percentKey = document.querySelector('.percent');
const equalKey = document.querySelector('.equal');

let currentDisplay = 0;
let firstNumberForCalculation = 0;
let secondNumberForCalculation = 0;
let clickedOperateKeyAtFirstTime = true;
let chosenOperator = '';

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
	if (num1 === 0 || num2 === 0) return 0;
	return +num1 / +num2;
}

function operate(operator, num1, num2) {
	switch (operator) {
		case '+':
			firstNumberForCalculation = add(num1, num2);
			display.value = firstNumberForCalculation;
			return;
		case '-':
			firstNumberForCalculation = subtract(num1, num2);
			display.value = firstNumberForCalculation;
			return;
		case '*':
			firstNumberForCalculation = multiply(num1, num2);
			display.value = firstNumberForCalculation;
			return;
		case '/':
			firstNumberForCalculation = divide(num1, num2);
			display.value = firstNumberForCalculation;
			return;
		default:
			break;
	}
}

function pushNumberKey(e) {
	if (currentDisplay === 0 && e.target.value === '0') return;
	if (currentDisplay === 0) {
		currentDisplay = e.target.value;
		display.value = currentDisplay;
		return;
	}

	currentDisplay += e.target.value;
	display.value = currentDisplay;
}

function pushOperateKey(e) {
	if (clickedOperateKeyAtFirstTime) {
		chosenOperator = e.target.value;
		firstNumberForCalculation = +currentDisplay;
		currentDisplay = 0;
		clickedOperateKeyAtFirstTime = false;
		return;
	}

	// store second number for calculation
	secondNumberForCalculation = +currentDisplay;

	// do calculation
	operate(
		chosenOperator,
		firstNumberForCalculation,
		secondNumberForCalculation
	);

	// after calculation, display resets and operator chose again
	currentDisplay = 0;
	chosenOperator = e.target.value;
}

function pushEqualKey(e) {
	if (clickedOperateKeyAtFirstTime) return;

	// store second number for calculation
	secondNumberForCalculation = +currentDisplay;

	// do calculation
	operate(
		chosenOperator,
		firstNumberForCalculation,
		secondNumberForCalculation
	);

	// after calculation, display resets and operator chose again
	currentDisplay = 0;
	chosenOperator = e.target.value;
}

numberKeys.forEach((numberKey) =>
	numberKey.addEventListener('click', (e) => pushNumberKey(e))
);
operateKeys.forEach((operateKey) =>
	operateKey.addEventListener('click', (e) => pushOperateKey(e))
);
equalKey.addEventListener('click', (e) => pushEqualKey(e));

// clearKey.addEventListener('click', (e) => {

// });
