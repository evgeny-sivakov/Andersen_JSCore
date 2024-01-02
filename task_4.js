function isString(str) {
  return typeof str === 'string';
}

function concatStrings(strArg, separator) {
  let strResult = isString(strArg) ? strArg : '';
  let sep = isString(separator) ? separator : '';

  function skipCurrying(arg) {
    return arg === undefined ? strResult : skipCurrying;
  }

  if (isString(strArg)) {
    return function (next) {
      if (next === undefined) {
        return strArg;
      }

      return isString(next)
        ? concatStrings(strArg + sep + next, sep)
        : skipCurrying;
    };
  }

  return skipCurrying;
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
