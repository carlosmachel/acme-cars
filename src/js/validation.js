(function(win, doc) {
  'use strict';

  function Validator(formValidation) {
    if (!(this instanceof Validator)) return new Validator(formValidation);

    this.formValidation = doc.querySelector(formValidation);
    initEvents(this.formValidation, this.validateItem);
  }

  function initEvents(formValidation, callback) {
    formValidation.querySelectorAll('input').forEach(function(item) {
      item.addEventListener('blur', callback, false);
    });
  }

  function validateRequire(item) {
    if (item.hasAttribute('required') && !item.value) {
      item.nextElementSibling.textContent = 'Favor preencher o campo';
      return false;
    }

    item.nextElementSibling.textContent = '';
    return true;
  }

  Validator.prototype.validateForm = function validateForm() {
    var inputs = this.formValidation.querySelectorAll('input');
    var validated = false;
    inputs.forEach(function(item) {
      validated = Validator.prototype.validateItem.call(item);
    });
    return validated;
  };

  Validator.prototype.validateItem = function validateItem() {
    let validated = false;
    validated = validateRequire(this);
    return validated;
  };

  window.Validator = Validator;
})(window, document);
