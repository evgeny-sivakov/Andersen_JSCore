function isNumber(num) {
  return typeof num === 'number';
}

function isValidArray(arr) {
  return arr.filter((el) => typeof el !== 'number').length === 0;
}

function makeObjectDeepCopy(obj) {
  const sourceKeys = Object.keys(obj);
  const copy = {};

  sourceKeys.forEach((key) => {
    if (typeof obj[key] === 'object') {
      makeObjectDeepCopy(obj[key]);
    }

    copy[key] = obj[key];
  });

  return copy;
}

function selectFromInterval(array, firstIndex, secondIndex) {
  if (!isValidArray(array) || !isNumber(firstIndex) || !isNumber(secondIndex)) {
    throw new Error('Ошибка!');
  }

  const [start, end] = [firstIndex, secondIndex].sort((a, b) => a - b);
  const result = array.filter((el) => start <= el && el <= end);

  return result;
}

const myIterable = {};
myIterable[Symbol.iterator] = function () {
  let currentValue = this.from;
  const lastValue = this.to;

  if (
    lastValue < currentValue ||
    !isNumber(currentValue) ||
    !isNumber(lastValue)
  ) {
    throw new Error('Ошибка!');
  }

  return {
    next: function () {
      return currentValue <= lastValue
        ? { value: currentValue++, done: false }
        : { done: true };
    },
  };
};
