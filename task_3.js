Array.prototype.myFilter = function (callback) {
  const filteredArray = [];
  
  for (let i = 0; i < this.length; i++) {
    const callbackResult = callback(this[i], i, this);

    if (callbackResult) {
      filteredArray.push(this[i]);
    }
  }
  return filteredArray;
};
