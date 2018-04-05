(function ($, doc) {
    'use strict';
  
    /*
    Vamos estruturar um pequeno app utilizando módulos.
    Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
    A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
    seguinte forma:
    - No início do arquivo, deverá ter as informações da sua empresa - nome e
    telefone (já vamos ver como isso vai ser feito)
    - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
    um formulário para cadastro do carro, com os seguintes campos:
      - Imagem do carro (deverá aceitar uma URL)
      - Marca / Modelo
      - Ano
      - Placa
      - Cor
      - e um botão "Cadastrar"
  
    Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
    carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
    aparecer no final da tabela.
  
    Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
    empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
    Dê um nome para a empresa e um telefone fictício, preechendo essas informações
    no arquivo company.json que já está criado.
  
    Essas informações devem ser adicionadas no HTML via Ajax.
  
    Parte técnica:
    Separe o nosso módulo de DOM criado nas últimas aulas em
    um arquivo DOM.js.
  
    E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
    que será nomeado de "app".
    */
  
    var app = (function () {
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
        }
        catch (e) {
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
        ajax.addEventListener(
          'readystatechange',
          handleReadyStateChange,
          false
        );
      }
  
      return {
        init: function init() {
          this.initEvents();
          getCompanyInfo();
        },
        initEvents: function initEvents() {
          $('[data-js="form"]').on('submit', app.handleSubmit);
        },
        handleSubmit: function handleSubmit(event) {
          event.preventDefault();
          var $tbody = $('[data-js="table-body"]').get();
          $tbody.appendChild(app.populateRow());
        },
        populateRow: function populateRow() {
          var $fragment = doc.createDocumentFragment();
          var $tr = createTableRow();
  
          var $inputs = $('[data-js="form-input"]');
          var $image = $('[data-js="form-image"]');
  
          $tr.appendChild(createTableDataImage($image.get().value));
  
          $inputs.forEach(function (item) {
            $tr.appendChild(createTableData(item.value));
          });
  
          return $tr;
        }
      }
    })();
  
    window.app = app;
  
    app.init();
  
  })(window.DOM, document);
  
  