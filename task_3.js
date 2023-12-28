Array.prototype.myFilter = function (callback, thisArg = this) {
  const filteredArray = [];
  
  for (let i = 0; i < thisArg.length; i++) {
    const callbackResult = callback(thisArg[i], i, thisArg);

    if (callbackResult) {
      filteredArray.push(thisArg[i]);
    }
  }
  return filteredArray;
};
