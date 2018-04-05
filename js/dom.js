(function(window, doc){
    'use strict';
  
    function DOM( elements ) {
      if(!(this instanceof DOM))
        return new DOM(elements);
  
      this.element = doc.querySelectorAll(elements);
  
    }
  
    DOM.prototype.on = function on(eventName, callback) {
      this.element.forEach(function (item) {
        item.addEventListener(eventName, callback, false);
      });
    }
  
    DOM.prototype.off = function off(eventName, callback) {
      this.element.forEach(function (item ) {
        item.removeEventListener(eventName, callback, false);
      })
    }
  
    DOM.prototype.get = function get(index) {
      if(!index)
        return this.element[0];
      return this.element[index];
    }
  
    DOM.prototype.forEach = function forEach() {
      return Array.prototype.forEach.apply(this.element, arguments);
    }
  
    DOM.prototype.map = function map() {
      return Array.prototype.map.apply(this.element, arguments);
    }
  
    DOM.prototype.filter = function filter() {
      return Array.prototype.filter.apply(this.element, arguments);
    }
  
    DOM.prototype.reduce = function reduce() {
      return Array.prototype.reduce.apply(this.element, arguments);
    }
  
    DOM.prototype.reduceRight = function reduceRight() {
      return Array.prototype.reduceRight.apply(this.element, arguments);
    }
  
    DOM.prototype.every = function every() {
      return Array.prototype.every.apply(this.element, arguments);
    }
  
    DOM.prototype.some = function some() {
      return Array.prototype.some.apply(this.element, arguments);
    }
  
  
    DOM.is = function is(element) {
      return Object.prototype.toString.apply(element);
    }
  
    DOM.isArray = function isArray(element) {
      return DOM.is(element) === '[object Array]';
    }
  
    DOM.isObject = function isObject(element) {
      return DOM.is(element) === '[object Object]';
    }
  
    DOM.isFunction = function isFunction(element) {
      return DOM.is(element) === '[object Function]';
    }
  
    DOM.isNumber = function isNumber(element) {
      return DOM.is(element) === '[object Number]';
    }
  
    DOM.isString = function isString(element) {
      return DOM.is(element) === '[object String]';
    }
  
    DOM.isBoolean = function isBoolean(element) {
      return DOM.is(element) === '[object Boolean]';
    }
  
    DOM.isNull = function isNull(element) {
      return DOM.is(element) === '[object Null]'
          || DOM.is(element) === '[object Undefined]';
    }
    window.DOM = DOM;
  
  })(window, document);
  
  