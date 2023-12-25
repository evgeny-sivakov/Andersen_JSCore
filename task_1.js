function convertNumber() {
  const firstPrompt = prompt('Enter number to convert');

  if (firstPrompt === '') {
    throw new Error('Некорректный ввод!');
  }

  const sourceNumber = +firstPrompt;
  const secondPrompt = prompt('Enter numeral system base');

  if (secondPrompt === '') {
    throw new Error('Некорректный ввод!');
  }

  const radix = +secondPrompt;

  if (isNaN(sourceNumber) || isNaN(radix) || radix < 2 || radix > 36) {
    return console.log('Некорректный ввод!');
  }

  console.log(sourceNumber.toString(radix));
}

function addDivide() {
  const first = +prompt('Enter the first number');

  if (isNaN(first)) {
    return console.log('Некорректный ввод!');
  }

  const second = +prompt('Enter the second number');

  if (isNaN(second)) {
    return console.log('Некорректный ввод!');
  }

  const result = `Ответ: ${first + second}, ${first / second}`;

  console.log(result);
}
