/* Initialise variables */
var currentValue = '';
var previousValue = '';
var currentOperator = null;
var shouldResetScreen = false;

/* Initialise objects from DOM */
const currentScreen = document.getElementById('currentScreen');
const lastScreen = document.getElementById('lastScreen');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalBtn = document.getElementById('equals');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const pointBtn = document.getElementById('point');

/* Define buttons respective actions */
numberBtns.forEach((button)=>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorBtns.forEach((button)=>
    button.addEventListener('click', function() {
         setOperator(button.textContent);
    })
)

equalBtn.addEventListener('click', evaluate);

clearBtn.addEventListener('click', clear);

pointBtn.addEventListener('click', appendPoint);

deleteBtn.addEventListener('click', deleteNumber);

/* Declare all functions */
function add(a, b) {
	return a+b;
};

function subtract(a, b) {
	return a-b;
};

function multiply(a,b) {
    return a*b;
  };

function divide(a, b){
    return a/b;
}

function operate(a,b,operator){
    a = Number(a);
    b = Number(b);
    switch (operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case 'x':
            return multiply(a,b);
        case '÷':
            return divide(a,b);
    }
}

function evaluate(){
    if(currentOperator === null || shouldResetScreen){
        return
    }
    if(currentOperator === '÷' && currentScreen.textContent === '0'){
        alert(`Can't divide by 0!`)
        return
    }
    previousValue = currentScreen.textContent;
    currentScreen.textContent = roundResult(operate(currentValue, previousValue, currentOperator));
    lastScreen.textContent = `${currentValue} ${currentOperator} ${previousValue}`;
    currentOperator = null;
}

function appendNumber(number){
    if(currentScreen.textContent === '0' || shouldResetScreen)
        resetScreen()
    currentScreen.textContent += number;
}

function resetScreen(){
    currentScreen.textContent = '';
    shouldResetScreen = false;
}

function clear(){
    currentScreen.textContent = '0';
    lastScreen.textContent = '';
    currentValue = '';
    previousValue = '';
    currentOperator = null;
}

function setOperator(operator){
    if(currentOperator === '÷' && currentScreen.textContent === '0'){
        alert(`Can't divide by 0!`)
        return
    }
    if(currentOperator !== null) {
        evaluate();
    }
    
    currentValue = currentScreen.textContent;
    currentOperator = operator;
    lastScreen.textContent = `${currentValue} ${currentOperator}`;
    shouldResetScreen = true;
}

function roundResult(number){
    return Math.round(number * 1000) / 1000;
}

function appendPoint(){
    if (shouldResetScreen) resetScreen();
    if(currentScreen.textContent === ''){
        currentScreen.textContent = '0';
    }
    if(currentScreen.textContent.indexOf('.') !== -1){
        return
    }
    currentScreen.textContent += '.';
}

function deleteNumber(){
    currentScreen.textContent = currentScreen.textContent.slice(0,-1);
}

