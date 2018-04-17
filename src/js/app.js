(function($, doc, Validator) {
  'use strict';

  var app = (function() {
    var ajax = new XMLHttpRequest();

    function createTableData(content) {
      var $td = doc.createElement('td');
      $td.textContent = content;

      return $td;
    }

    function createTableDataImage(content) {
      var $td = doc.createElement('td');
      var $img = doc.createElement('img');
      $img.src = content;
      $td.appendChild($img);
      return $td;
    }

    function createRemoveButton() {
      var $td = doc.createElement('td');
      $td.classList.add('td__actions');

      var $button = doc.createElement('button');
      var $icon = doc.createElement('i');
      $icon.classList.add('fa', 'fa-trash');
      $button.appendChild($icon);

      $button.addEventListener('click', handleRemoveClick, false);
      $td.appendChild($button);
      return $td;
    }

    function handleRemoveClick() {
      var $tbody = $('[data-js="table-body"]').get();

      $tbody.removeChild(this.parentElement.parentElement);
    }

    function createTableRow() {
      var $tr = doc.createElement('tr');
      $tr.classList.add('table__row');
      return $tr;
    }

    function handleReadyStateChange() {
      if (isRequestOk()) {
        populateCompanyInfo();
      }
    }

    function populateCompanyInfo() {
      var data = parseData();
      if (!data) {
        data = clearData();
      }
      var $companyTitle = $('[data-js="company-title"]').get();
      var $companyTelephone = $('[data-js="company-telephone"]').get();

      $companyTitle.textContent = data.name;
      $companyTelephone.textContent = data.phone;
    }

    function parseData() {
      var result;

      try {
        result = JSON.parse(ajax.responseText);
      } catch (e) {
        result = null;
      }
      return result;
    }

    function isRequestOk() {
      return ajax.readyState === 4 && ajax.status === 200;
    }

    function getCompanyInfo() {
      ajax.open('GET', 'company.json', true);
      ajax.send(null);
      ajax.addEventListener('readystatechange', handleReadyStateChange, false);
    }

    return {
      init: function init() {
        this.validator = Validator('[data-js="form"]');
        this.initEvents();
        getCompanyInfo();
      },
      initEvents: function initEvents() {
        $('[data-js="form"]').on('submit', app.handleSubmit);
      },
      handleSubmit: function handleSubmit(event) {
        event.preventDefault();

        if (app.validator.validateForm()) {
          var $tbody = $('[data-js="table-body"]').get();
          $tbody.appendChild(app.populateRow());
          $('[data-js="form"]')
            .get()
            .reset();
        }
      },
      populateRow: function populateRow() {
        var $fragment = doc.createDocumentFragment();
        var $tr = createTableRow();

        var $inputs = $('[data-js="form-input"]');
        var $image = $('[data-js="form-image"]');

        $tr.appendChild(createTableDataImage($image.get().value));

        $inputs.forEach(function(item) {
          $tr.appendChild(createTableData(item.value));
        });

        $tr.appendChild(createRemoveButton());
        return $tr;
      }
    };
  })();

  window.app = app;

  app.init();
})(window.DOM, document, window.Validator);
