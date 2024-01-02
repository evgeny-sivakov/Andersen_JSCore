function isString(str) {
  return typeof str === 'string';
}

function concatStrings(str, separator) {
  let string = isString(str) ? str : '';
  let sep = isString(separator) ? separator : '';

  function skipCurring(arg) {
    return arg === undefined ? string : skipCurring;
  }

  if (typeof str === 'string') {
    return function (next) {

      if (next === undefined) {
        return str;
      }
      
      return isString(next) ? concatStrings(str + sep + next, sep) : skipCurring;
    };
  }

  return skipCurring;
}

class Calculator {
  constructor(num_1, num_2) {
    if (
      typeof num_1 !== 'number' ||
      !isFinite(num_1) ||
      typeof num_2 !== 'number' ||
      !isFinite(num_2)
    ) {
      throw new Error('Ошибка!');
    }

    this.num_1 = num_1;
    this.num_2 = num_2;
  }

  static updateProp(prop, currentState, newValue) {
    if (typeof newValue !== 'number' || !isFinite(newValue)) {
      throw new Error('Ошибка!');
    }
    
    currentState[prop] = newValue;
  }

  static calc(operation, operand_1, operand_2) {
    switch (operation) {
      case 'add':
        return operand_1 + operand_2;
      case 'multiply':
        return operand_1 * operand_2;
      case 'subtract':
        return operand_1 - operand_2;
      case 'divide':
        if (operand_2 === 0) {
          throw new Error('Ошибка!');
        }
        return operand_1 / operand_2;
    }
  }

  setX = (num) => {
    Calculator.updateProp('num_1', this, num);
  };

  setY = (num) => {
    Calculator.updateProp('num_2', this, num);
  };

  logSum = () => {
    console.log(Calculator.calc('add', this.num_1, this.num_2))
  };

  logMul = () => {
    console.log(Calculator.calc('multiply', this.num_1, this.num_2))
  };

  logSub = () => {
    console.log(Calculator.calc('subtract', this.num_1, this.num_2))
  };

  logDiv = () => {
    console.log(Calculator.calc('divide', this.num_1, this.num_2))
  };
}
