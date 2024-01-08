function isValidNumber(num) {
  return typeof num === 'number' && isFinite(num);
}

function isValidString(str) {
  return typeof str === 'string' && str.length >= 1 && str.length <= 50;
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
    currentFuelVolume,
    mileage
  ) {
    this.#brand = brand;
    this.#model = model;
    this.#yearOfManufacturing = yearOfManufacturing;
    this.#maxSpeed = maxSpeed;
    this.#maxFuelVolume = maxFuelVolume;
    this.#fuelConsumption = fuelConsumption;
    this.#currentFuelVolume = currentFuelVolume || 0;
    this.#isStarted = false;
    this.#mileage = mileage || 0;
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
  }

  fillUpGasTank(ltrs) {
    if (!isValidNumber(ltrs) || num <= 0) {
      throw new Error('Неверное количество топлива для заправки');
    }

    const fuelVolumeAfterFillUp = this.#currentFuelVolume + ltrs;

    if (fuelVolumeAfterFillUp > this.#maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }

    this.#currentFuelVolume = fuelVolumeAfterFillUp;
  }

  drive(speed, hours) {
    if (!isValidNumber(speed) || num <= 0) {
      throw new Error('Неверная скорость');
    } else if (!isValidPositiveNumber(hours)) {
      throw new Error('Неверное количество часов');
    } else if (speed > this.#maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    } else if (!this.#isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const desiredDistance = speed * hours;
    const requiredFuelVolume = desiredDistance * (this.#fuelConsumption / 100);

    if (requiredFuelVolume > this.#currentFuelVolume) {
      throw new Error('Недостаточно топлива');
    }

    this.#currentFuelVolume = this.#currentFuelVolume - requiredFuelVolume;
    this.#mileage = this.#mileage + desiredDistance;
  }

  get brand() {
    return this.#brand;
  }

  set brand(str) {
    if (!isValidString(str)) {
      throw new Error('Неверное название бренда');
    }

    this.#brand = str;
  }

  get model() {
    return this.#model;
  }

  set model(str) {
    if (!isValidString(str)) {
      throw new Error('Неверное название модели');
    }

    this.#model = str;
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }

  set yearOfManufacturing(year) {
    const currentYear = new Date().getFullYear();

    if (!isValidNumber(year) || year < 1900 || year > currentYear) {
      throw new Error('Неверный год выпуска');
    }

    this.#yearOfManufacturing = year;
  }

  get maxSpeed() {
    return `${this.#maxSpeed}km/h`;
  }

  set maxSpeed(speed) {
    if (!isValidNumber(speed) || speed < 100 || speed > 300) {
      throw new Error('Неверная максимальная скорость');
    }

    this.#maxSpeed = speed;
  }

  get maxFuelVolume() {
    return `${this.#maxFuelVolume}l`;
  }

  set maxFuelVolume(ltrs) {
    if (!isValidNumber(ltrs) || ltrs < 5 || ltrs > 20) {
      throw new Error('Неверный максимальный объем топливного бака');
    }

    this.#maxFuelVolume = ltrs;
  }

  get fuelConsumption() {
    return `${this.#fuelConsumption}L/100km`;
  }

  set fuelConsumption(ltrs) {
    if (!isValidNumber(ltrs) || ltrs < 5 || ltrs > 20) {
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
