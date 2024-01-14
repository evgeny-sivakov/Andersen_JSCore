import { toValidNumber, toValidString } from './conversions.js';
import { operationStateHandler } from './operationStateHandler.js';

function performCalculation(hint, state, buttonValue = null) {
  const { firstOperand, secondOperand, operation } = state;
  let result;

  try {
    result = calculate(
      toValidNumber(firstOperand),
      toValidNumber(secondOperand),
      operation
    );

    const resultString = toValidString(result);

    state.firstOperand = resultString;
    state.secondOperand = '0';
    state.calculated = true;
    state.pendingOperation = false;
    state.currentDisplayValue = resultString;

    switch (hint) {
      case 'intermediate-result':
        operationStateHandler('setOn', state, buttonValue);
        break;

      case 'final-result':
        operationStateHandler('reset', state);
        break;
    }
  } catch (error) {
    state.calculated = false;
    state.firstOperand = '0';
    state.currentDisplayValue = error.message;
  }
}

function calculate(operand1, operand2, operation) {
  switch (operation) {
    case 'add':
      return operand1 + operand2;
    case 'multiply':
      return operand1 * operand2;
    case 'subtract':
      return operand1 - operand2;
    case 'divide':
      if (operand2 === 0) {
        throw new Error('Error');
      }
      return operand1 / operand2;
  }
}

export { performCalculation };
