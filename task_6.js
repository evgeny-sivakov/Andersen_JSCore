function isValidNumber(num) {
  return typeof num === 'number' && isFinite(num);
}

function isValidString(str) {
  return typeof str === 'string';
}

function isInRange(value, min, max = null) {
  let num;
  if (isValidString(value)) {
    num = value.length;
  } else if (isValidNumber(value)) {
    num = value;
  }

  return num >= min && num <= max;
}

class Car {
  #brand;
  #model;
  #yearOfManufacturing;
  #maxSpeed;
  #maxFuelVolume;
  #fuelConsumption;
  #currentFuelVolume;
  #isStarted;
  #mileage;

  constructor(
    brand,
    model,
    yearOfManufacturing,
    maxSpeed,
    maxFuelVolume,
    fuelConsumption,
    currentFuelVolume = 0,
    mileage = 0
  ) {
    this.#brand = brand;
    this.#model = model;
    this.#yearOfManufacturing = yearOfManufacturing;
    this.#maxSpeed = maxSpeed;
    this.#maxFuelVolume = maxFuelVolume;
    this.#fuelConsumption = fuelConsumption;
    this.#currentFuelVolume = currentFuelVolume;
    this.#isStarted = false;
    this.#mileage = mileage;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Машина уже заведена');
    }

    this.#isStarted = true;
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error('Машина ещё не заведена');
    }

    this.#isStarted = false;
  }

  fillUpGasTank(ltrs) {
    if (!isValidNumber(ltrs) || !isInRange(ltrs, 0)) {
      throw new Error('Неверное количество топлива для заправки');
    }

    const fuelVolumeAfterFillUp = this.#currentFuelVolume + ltrs;

    if (fuelVolumeAfterFillUp > this.#maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }

    this.#currentFuelVolume = fuelVolumeAfterFillUp;
  }

  drive(speed, hours) {
    if (!isValidNumber(speed) || !isInRange(speed, 0)) {
      throw new Error('Неверная скорость');
    } else if (!isValidNumber(hours) || hours <= 0) {
      throw new Error('Неверное количество часов');
    } else if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    } else if (!this.#isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const expectedDistance = speed * hours;
    const requiredFuel = expectedDistance * (this.#fuelConsumption / 100);

    if (requiredFuel > this.#currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume -= requiredFuel;
    this.#mileage += expectedDistance;
  }

  get brand() {
    return this.#brand;
  }

  set brand(str) {
    if (!isValidString(str) || !isInRange(str, 0, 50)) {
      throw new Error('Неверное название бренда');
    }

    this.#brand = str;
  }

  get model() {
    return this.#model;
  }

  set model(str) {
    if (!isValidString(str) || !isInRange(str, 0, 50)) {
      throw new Error('Неверное название модели');
    }

    this.#model = str;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(year) {
    const currentYear = new Date().getFullYear();

    if (!isValidNumber(year) || !isInRange(year, 1900, currentYear)) {
      throw new Error('Неверный год выпуска');
    }

    this.#yearOfManufacturing = year;
  }

  get maxSpeed() {
    return `${this.#maxSpeed}km/h`;
  }

  set maxSpeed(speed) {
    if (!isValidNumber(speed) || !isInRange(speed, 100, 300)) {
      throw new Error('Неверная максимальная скорость');
    }

    this.#maxSpeed = speed;
  }

  get maxFuelVolume() {
    return `${this.#maxFuelVolume}l`;
  }

  set maxFuelVolume(ltrs) {
    if (!isValidNumber(ltrs) || !isInRange(ltrs, 5, 20)) {
      throw new Error('Неверный максимальный объем топливного бака');
    }

    this.#maxFuelVolume = ltrs;
  }

  get fuelConsumption() {
    return `${this.#fuelConsumption}L/100km`;
  }

  set fuelConsumption(ltrs) {
    if (!isValidNumber(ltrs) || !isInRange(ltrs, 5, 20)) {
      throw new Error('Неверный расход топлива');
    }

    this.#fuelConsumption = ltrs;
  }

  get currentFuelVolume() {
    return `${this.#currentFuelVolume}l`;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get mileage() {
    return `${this.#mileage}km`;
  }
}