function convertNumber() {
  const sourceNumber = +window.prompt('Enter number to convert');
  const radix = +window.prompt('Enter numeral system base');

  if (isNaN(sourceNumber) || isNaN(radix)) {
    console.log('Некорректный ввод!');
    return;
  }

  const result = sourceNumber.toString(radix);

  console.log(result);
}

function addDivide() {
  const first = +window.prompt('Enter the first number');

  if (isNaN(first)) {
    console.log('Некорректный ввод!');
    return;
  }

  const second = +window.prompt('Enter the second number');

  if (isNaN(second)) {
    console.log('Некорректный ввод!');
    return;
  }

  const result = `Ответ: ${first + second}, ${first / second}`;

  console.log(result);
}
