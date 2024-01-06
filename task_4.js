function concatStrings(strArg, separator) {
  let strResult = isString(strArg) ? strArg : '';
  let sep = isString(separator) ? separator : '';

  function isString(str) {
    return typeof str === 'string';
  }

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
  constructor(...args) {
    if (!Calculator.isValidNumber(num1) || !Calculator.isValidNumber(num2)) {
      throw new Error('Ошибка!');
    } else if (args.length !== 2) {
      throw new Error('Ошибка! Неправильное количество аргументов')
    }

    this.num1 = args[0];
    this.num2 = args[1];
  }

  static isValidNumber(num) {
    return typeof num === 'number' && isFinite(num);
  }

  static updateProp(prop, currentState, newValue) {
    if (!Calculator.isValidNumber(newValue)) {
      throw new Error('Ошибка!');
    }

    currentState[prop] = newValue;
  }

  static calc(operation, operand1, operand2) {
    switch (operation) {
      case 'add':
        return operand1 + operand2;
      case 'multiply':
        return operand1 * operand2;
      case 'subtract':
        return operand1 - operand2;
      case 'divide':
        if (operand2 === 0) {
          throw new Error('Ошибка!');
        }

        return operand1 / operand2;
    }
  }

  setX = (num) => {
    Calculator.updateProp('num1', this, num);
  };

  setY = (num) => {
    Calculator.updateProp('num2', this, num);
  };

  logSum = () => {
    console.log(Calculator.calc('add', this.num1, this.num2));
  };

  logMul = () => {
    console.log(Calculator.calc('multiply', this.num1, this.num2));
  };

  logSub = () => {
    console.log(Calculator.calc('subtract', this.num1, this.num2));
  };

  logDiv = () => {
    console.log(Calculator.calc('divide', this.num1, this.num2));
  };
}