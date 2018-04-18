(function() {
  'use strict';

  function CarShop() {}

  function isRequestOk(xhr) {
    return xhr.readyState === 4 && xhr.status === 200;
  }

  CarShop.Car = function Car(image, brandModel, year, plate, color) {
    this.image = image;
    this.brandModel = brandModel;
    this.year = year;
    this.plate = plate;
    this.color = color;
  };

  CarShop.getCars = function getCars(callback) {
    var get = new XMLHttpRequest();
    get.open('GET', 'http://localhost:3000/car', true);
    get.send(null);
    get.onreadystatechange = function() {
      if (isRequestOk(get)) {
        callback(JSON.parse(get.responseText));
      }
    };
  };

  CarShop.insertCar = function insertCar(car, callback) {
    var post = new XMLHttpRequest();
    post.open('POST', 'http://localhost:3000/car/');
    post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    post.send(
      'image=' +
        car.image +
        '&brandModel=' +
        car.brandModel +
        '&year=' +
        car.year +
        '&plate=' +
        car.plate +
        '&color' +
        car.color
    );
    post.onreadystatechange = function() {
      if (isRequestOk(post)) {
        return callback(car);
      }
    };
  };

  window.CarShop = CarShop;
})();
