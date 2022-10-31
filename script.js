// TODO: 4. I have to set max number. Because numbers are poked out in display. (I think I have to change CSS)
// FIXME: If you want to calculate with decimal number, error happens!! fix!!
// FIXME: After clicked equal sign and user want to calculate new value, error happens!! fix!!

const numberKeys = document.querySelectorAll('.number');
const operateKeys = document.querySelectorAll('.operate');
const keys = document.querySelectorAll('.key');

const container = document.querySelector('.calculator');
const display = document.querySelector('.calculator-screen');
const clearKey = document.querySelector('.clear');
const convertKey = document.querySelector('.convert');
const equalKey = document.querySelector('.equal');

const operator = document.createElement('p');
const equalOperator = document.createElement('p');

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
	if (e.type === 'click') {
		// When user click number's key...
		if (currentDisplay === 0 && e.target.value === '0') return;
		if (currentDisplay === 0 && e.target.value === '.')
			currentDisplay += e.target.value;
		if (currentDisplay.toString().includes('.') && e.target.value === '.')
			return;
		if (currentDisplay === 0) {
			currentDisplay = e.target.value;
			display.value = currentDisplay;
			return;
		}

		currentDisplay += e.target.value;
		display.value = currentDisplay;
	} else {
		// When user push number's key...
		if (
			e.key !== '1' &&
			e.key !== '2' &&
			e.key !== '3' &&
			e.key !== '4' &&
			e.key !== '5' &&
			e.key !== '6' &&
			e.key !== '7' &&
			e.key !== '8' &&
			e.key !== '9' &&
			e.key !== '0' &&
			e.key !== '.'
		)
			return;
		if (currentDisplay === 0 && e.key === '0') return;
		if (currentDisplay === 0 && e.key === '.') currentDisplay += e.key;
		if (currentDisplay.toString().includes('.') && e.key === '.') return;
		if (currentDisplay === 0) {
			currentDisplay = e.key;
			display.value = currentDisplay;
			return;
		}

		currentDisplay += e.key;
		display.value = currentDisplay;
	}
}

function showOperatorIcon(chosenOperator) {
	if (chosenOperator === '%') return;
	if (chosenOperator === '/') {
		operator.textContent = '÷';
	} else if (chosenOperator === '*') {
		operator.textContent = 'x';
	} else if (chosenOperator === '-') {
		operator.textContent = '-';
	} else if (chosenOperator === '+') {
		operator.textContent = '+';
	}

	operator.classList.add('calculator-operator');
	container.insertBefore(operator, container.firstChild);
}

function showEqualOperator(equalSign) {
	equalOperator.classList.add('calculator-operator-equal');
	equalOperator.textContent = equalSign;
	container.appendChild(equalOperator);
}

function deleteOperatorIcon() {
	if (document.body.contains(operator)) {
		container.removeChild(operator);
	}
}

function deleteEqualIcon() {
	if (document.body.contains(equalOperator)) {
		container.removeChild(equalOperator);
	}
}

function pushPercentKey(e) {
	if (
		e.target.value === '%' &&
		(chosenOperator === '+' || chosenOperator === '-')
	) {
		secondNumberForCalculation =
			(+currentDisplay / 100) * firstNumberForCalculation;
	} else if (
		e.target.value === '%' &&
		(chosenOperator === '*' || chosenOperator === '/')
	) {
		secondNumberForCalculation = +currentDisplay / 100;
	} else {
		secondNumberForCalculation = +currentDisplay;
	}
}

function pushOperateKey(e) {
	if (e.type === 'click') {
		if (clickedOperateKeyAtFirstTime && currentDisplay === 0) return;
		if (clickedOperateKeyAtFirstTime) {
			if (e.target.value === '%') return;
			chosenOperator = e.target.value;
			firstNumberForCalculation = +currentDisplay;
			currentDisplay = 0;
			clickedOperateKeyAtFirstTime = false;
			showOperatorIcon(chosenOperator);
			return;
		}

		pushPercentKey(e);
		deleteEqualIcon();

		// do calculation
		operate(
			chosenOperator,
			firstNumberForCalculation,
			secondNumberForCalculation
		);

		deleteOperatorIcon();

		// after calculation, display resets. And operator chose again
		currentDisplay = 0;
		chosenOperator = e.target.value;
		showOperatorIcon(chosenOperator);
	} else {
		if (
			e.key !== '%' &&
			e.key !== '*' &&
			e.key !== '/' &&
			e.key !== '+' &&
			e.key !== '-'
		)
			return;
		if (clickedOperateKeyAtFirstTime && currentDisplay === 0) return;
		if (clickedOperateKeyAtFirstTime) {
			if (e.key === '%') return;
			chosenOperator = e.key;
			firstNumberForCalculation = +currentDisplay;
			currentDisplay = 0;
			clickedOperateKeyAtFirstTime = false;
			showOperatorIcon(chosenOperator);
			return;
		}

		pushPercentKey(e);
		deleteEqualIcon();

		// do calculation
		operate(
			chosenOperator,
			firstNumberForCalculation,
			secondNumberForCalculation
		);

		deleteOperatorIcon();

		// after calculation, display resets. And operator chose again
		currentDisplay = 0;
		chosenOperator = e.key;
		showOperatorIcon(chosenOperator);
	}
}

function pushEqualKey(e) {
	if (e.type === 'click') {
		if (clickedOperateKeyAtFirstTime) return;

		secondNumberForCalculation = +currentDisplay;
		deleteOperatorIcon();
		showEqualOperator('=');

		// do calculation
		operate(
			chosenOperator,
			firstNumberForCalculation,
			secondNumberForCalculation
		);

		// after calculation, display resets and operator chose again
		currentDisplay = 0;
		chosenOperator = e.target.value;
	} else {
		if (e.key !== '=') return;
		if (clickedOperateKeyAtFirstTime) return;

		secondNumberForCalculation = +currentDisplay;
		deleteOperatorIcon();
		showEqualOperator('=');

		// do calculation
		operate(
			chosenOperator,
			firstNumberForCalculation,
			secondNumberForCalculation
		);

		// after calculation, display resets and operator chose again
		currentDisplay = 0;
		chosenOperator = e.key;
	}
}

function pushConvertKey() {
	if (currentDisplay === 0) return;

	// convert from minus to plus
	if (currentDisplay.toString().includes('-')) {
		currentDisplay = currentDisplay.toString().replace('-', '');
		display.value = currentDisplay;
		return;
	}

	// convert from plus to minus
	if (+currentDisplay > 0) {
		currentDisplay = `-${currentDisplay}`;
		display.value = currentDisplay;
	}
}

function resetAll() {
	// operator resets
	chosenOperator = '';
	clickedOperateKeyAtFirstTime = true;

	// showed icon resets
	deleteOperatorIcon();
	deleteEqualIcon();

	// values resets
	firstNumberForCalculation = 0;
	secondNumberForCalculation = 0;

	// display resets
	currentDisplay = 0;
	display.value = currentDisplay;
}

function removeTransition(e) {
	if (e.propertyName !== 'transform') return;
	this.classList.remove('pushing');
}

function changeButtonColor(e) {
	let key;

	if (e.type === 'click') {
		// if user click keys, button's color change.
		key = document.querySelector(
			`.key[data-key="${e.currentTarget.dataset.key}"]`
		);
	} else {
		// if user push keys, button's color change.
		key = document.querySelector(`.key[data-key="${e.key}"]`);
	}
	if (!key) return;
	key.classList.toggle('pushing');
}

numberKeys.forEach((numberKey) => {
	numberKey.addEventListener('click', pushNumberKey);
});

operateKeys.forEach((operateKey) =>
	operateKey.addEventListener('click', pushOperateKey)
);

convertKey.addEventListener('click', pushConvertKey);
equalKey.addEventListener('click', pushEqualKey);
clearKey.addEventListener('click', resetAll);

keys.forEach((key) => key.addEventListener('click', changeButtonColor));
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

document.addEventListener('keydown', changeButtonColor);
document.addEventListener('keydown', pushNumberKey);
document.addEventListener('keydown', pushOperateKey);
document.addEventListener('keydown', pushEqualKey);
