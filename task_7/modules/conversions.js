function toValidString(num) {
  return parseFloat(num.toFixed(8)).toString().replace('.', ',');
}

function toValidNumber(string) {
  return parseFloat(string.replace(',', '.'));
}

export { toValidNumber, toValidString };
