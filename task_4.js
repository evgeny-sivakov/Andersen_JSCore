/* function concatStrings(str, separator = '') {
    console.log(typeof str)
    if (typeof str !== 'string') {
        return
    }
  return function (next) {
    if (next === undefined) {
        return str;
      }

    return concatStrings(str + separator + next);
  };
}

console.log(concatStrings(2)(2)('third')()); */

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
  setX = (num) => {
    if (typeof num !== 'number' || !isFinite(num)) {
      throw new Error('Ошибка!');
    }

    this.num_1 = num;
  };

  setY = (num) => {
    if (typeof num !== 'number' || !isFinite(num)) {
      throw new Error('Ошибка!');
    }

    this.num_2 = num;
  };

  logSum = () => {
    function sum(first, second) {
      console.log(first + second);
    }

    sum(this.num_1, this.num_2);
  };

  logMul = () => {
    function mul(first, second) {
      console.log(first * second);
    }

    mul(this.num_1, this.num_2);
  };

  logSub = () => {
    function sub(first, second) {
      console.log(first - second);
    }

    sub(this.num_1, this.num_2);
  };

  logDiv = () => {
    function div(first, second) {
      if (second === 0) {
        throw new Error('Ошибка!');
      }

      console.log(first / second);
    }

    div(this.num_1, this.num_2);
  };
}