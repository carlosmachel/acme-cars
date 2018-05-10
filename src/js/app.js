;(function ($, doc, Validator, CarShop) {
  'use strict'
  var app = (function appController () {
    var ajax = new window.XMLHttpRequest()

    function createTableData (content) {
      var $td = doc.createElement('td')
      $td.textContent = content

      return $td
    }

    function createTableDataImage (content) {
      var $td = doc.createElement('td')
      var $img = doc.createElement('img')
      $img.src = content
      $td.appendChild($img)
      return $td
    }

    function createRemoveButton (key) {
      var $td = doc.createElement('td')
      $td.classList.add('td__actions')

      var $button = doc.createElement('button')
      $button.setAttribute('data-js-key', key)
      var $icon = doc.createElement('i')
      $icon.classList.add('fa', 'fa-trash')
      $button.appendChild($icon)

      $button.addEventListener('click', handleRemoveClick, false)
      $td.appendChild($button)
      return $td
    }

    function handleRemoveClick () {
      var plate = this.getAttribute('data-js-key')
      CarShop.removeCar(plate)
      var $tbody = $('[data-js="table-body"]').get()
      $tbody.removeChild(this.parentElement.parentElement)
    }

    function createTableRow () {
      var $tr = doc.createElement('tr')
      $tr.classList.add('table__row')
      return $tr
    }

    function handleReadyStateChange () {
      if (isRequestOk(ajax)) {
        populateCompanyInfo()
      }
    }
    function clearData () {}

    function populateCompanyInfo () {
      var data = parseData()
      if (!data) {
        data = clearData()
      }
      var $companyTitle = $('[data-js="company-title"]').get()
      var $companyTelephone = $('[data-js="company-telephone"]').get()

      $companyTitle.textContent = data.name
      $companyTelephone.textContent = data.phone
    }

    function parseData () {
      var result

      try {
        result = JSON.parse(ajax.responseText)
      } catch (e) {
        result = null
      }
      return result
    }

    function isRequestOk (xhr) {
      return xhr.readyState === 4 && xhr.status === 200
    }

    function getCompanyInfo () {
      ajax.open('GET', 'company.json', true)
      ajax.send(null)
      ajax.addEventListener('readystatechange', handleReadyStateChange, false)
    }

    function createCar () {
      var image = $('[data-js="form-image"]').get().value
      var brandModel = $('[data-js="form-brandModel"]').get().value
      var year = $('[data-js="form-year"]').get().value
      var color = $('[data-js="form-color"]').get().value
      var plate = $('[data-js="form-plate"]').get().value

      return new CarShop.Car(image, brandModel, year, plate, color)
    }

    return {
      init: function init () {
        this.validator = Validator('[data-js="form"]')
        this.initEvents()
        getCompanyInfo()
        CarShop.getCars(this.initPopulateTable)
      },
      initPopulateTable (cars) {
        console.log(cars)
        if (cars) {
          cars.forEach(function (item) {
            app.populateRow(item)
          })
        }
      },
      initEvents: function initEvents () {
        $('[data-js="form"]').on('submit', app.handleSubmit)
      },
      handleSubmit: function handleSubmit (event) {
        event.preventDefault()
        if (app.validator.validateForm()) {
          var car = createCar()
          CarShop.insertCar(car, app.populateRow)
        }
      },
      populateRow: function populateRow (car) {
        var $tbody = $('[data-js="table-body"]').get()
        var $tr = createTableRow()
        $tr.appendChild(createTableDataImage(car.image))
        $tr.appendChild(createTableData(car.brandModel))
        $tr.appendChild(createTableData(car.year))
        $tr.appendChild(createTableData(car.plate))
        $tr.appendChild(createTableData(car.color))
        $tr.appendChild(createRemoveButton(car.plate))
        $tbody.appendChild($tr)

        $('[data-js="form"]').get().reset()
      }
    }
  })()

  window.app = app

  app.init()
})(window.DOM, document, window.Validator, window.CarShop)
