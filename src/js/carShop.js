;(function (window) {
  'use strict'
  function CarShop () {}

  function isRequestOk (xhr) {
    return xhr.readyState === 4 && xhr.status === 200
  }

  CarShop.Car = function Car (image, brandModel, year, plate, color) {
    this.image = image
    this.brandModel = brandModel
    this.year = year
    this.plate = plate
    this.color = color
  }

  CarShop.getCars = function getCars (callback) {
    var get = new window.XMLHttpRequest()
    get.open('GET', 'http://localhost:3000/car')
    get.send(null)
    get.onreadystatechange = function () {
      if (isRequestOk(get)) {
        callback(JSON.parse(get.responseText))
      }
    }
  }

  CarShop.removeCar = function removeCar (plate) {
    var del = new window.XMLHttpRequest()
    del.open('DELETE', 'http://localhost:3000/car?plate=' + plate)
    del.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    del.send('plate=' + plate)
    del.onreadystatechange = function () {
      if (isRequestOk(del)) return del.responseText
    }
  }

  CarShop.insertCar = function insertCar (car, callback) {
    var post = new window.XMLHttpRequest()
    post.open('POST', 'http://localhost:3000/car/')
    post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    post.send(
      'image=' +
        car.image +
        '&brandModel=' +
        car.brandModel +
        '&year=' +
        car.year +
        '&plate=' +
        car.plate +
        '&color=' +
        car.color
    )
    console.log(post)
    post.onreadystatechange = function () {
      if (isRequestOk(post)) {
        return callback(car)
      }
    }
  }

  window.CarShop = CarShop
})(window)
