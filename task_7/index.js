import { performCalculation } from './modules/performCalculation.js';
import { toValidNumber, toValidString } from './modules/conversions.js';
import { operationStateHandler } from './modules/operationStateHandler.js';

const state = {
  firstOperand: '0',
  secondOperand: '0',
  operation: '',
  newActiveButton: null,
  pendingOperation: false,
  calculated: false,
  currentDisplayValue: '0',
};

const clickHandler = (event) => {
  let { firstOperand, secondOperand, operation, pendingOperation, calculated } =
    state;
  const buttonType = event.target.dataset.type;
  const buttonValue = event.target.dataset.value;
  const display = document.getElementById('display');
  const clearButton = document.querySelector('[data-value=clear]');

  switch (buttonType) {
    case 'operation':
      state.newActiveButton = event.target;

      if (operation === '') {
        firstOperand !== '0' &&
          operationStateHandler('setOn', state, buttonValue);
      } else {
        if (secondOperand === '0' && !pendingOperation) {
          operationStateHandler('update', state, buttonValue);
        } else {
          performCalculation('intermediate-result', state, buttonValue);
        }
      }
      break;

    case 'number':
      if (operation !== '') {
        if (!pendingOperation) {
          operationStateHandler('setOff', state);
          state.pendingOperation = true;
        }

        if (buttonValue === ',') {
          if (!secondOperand.includes(buttonValue)) {
            secondOperand += buttonValue;
            state.currentDisplayValue = secondOperand;
          }
        } else {
          secondOperand === '0'
            ? (state.currentDisplayValue = buttonValue)
            : (state.currentDisplayValue += buttonValue);
        }

        state.secondOperand = state.currentDisplayValue;
      } else if (operation === '') {
        if (buttonValue === ',') {
          if (!firstOperand.includes(buttonValue)) {
            firstOperand += buttonValue;
            state.currentDisplayValue = firstOperand;
          }
        } else {
          firstOperand === '0' || calculated
            ? (state.currentDisplayValue = buttonValue)
            : (state.currentDisplayValue += buttonValue);
        }

        state.firstOperand = state.currentDisplayValue;
        clearButton.textContent = 'C';
      }
      break;

    case 'special-function':
      if (buttonValue === 'clear') {
        if (calculated) {
          state.firstOperand = '0';
          state.secondOperand = '0';
          operationStateHandler('reset', state);
          state.pendingOperation = false;
          state.currentDisplayValue = '0';
          state.calculated = false;
          clearButton.textContent = 'AC';
        } else {
          if (secondOperand !== '0') {
            state.currentDisplayValue = '0';
            state.secondOperand = '0';
            state.pendingOperation = false;
            operationStateHandler('setOn', state);
            clearButton.textContent = 'AC';
          } else {
            state.currentDisplayValue = '0';
            state.firstOperand = '0';
            operationStateHandler('reset', state);
            clearButton.textContent = 'AC';
          }
        }
      } else if (buttonValue === 'opposite') {
        const newValue = toValidNumber(state.currentDisplayValue) * -1;
        const newValueString = toValidString(newValue);

        state.currentDisplayValue = newValueString;
        operation === ''
          ? (state.firstOperand = newValueString)
          : (state.secondOperand = newValueString);
      } else if (buttonValue === 'percent') {
        if (operation === '') {
          state.firstOperand = toValidString(toValidNumber(firstOperand) / 100);
          state.currentDisplayValue = state.firstOperand;
        } else {
          state.secondOperand = toValidString(
            (toValidNumber(firstOperand) * toValidNumber(secondOperand)) / 100
          );
          state.currentDisplayValue = state.secondOperand;
        }
      } else if (buttonValue === 'equal') {
        if (operation !== '') {
          !pendingOperation && (state.secondOperand = firstOperand);
          performCalculation('final-result', state);
        }
      }
      break;
  }

  display.value = state.currentDisplayValue;
};

const btnContainer = document.getElementById('btnContainer');
btnContainer.addEventListener('click', clickHandler);
