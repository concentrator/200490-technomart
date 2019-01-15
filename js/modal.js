'use strict';
(function () {
  var contactOpen = document.querySelector('.contact-us__button');
  var contactModal = document.getElementById('modal-contact');
  var productBuy = document.querySelectorAll('.product__buy');
  var cartModal = document.getElementById('modal-cart');
  var mapOpen = document.querySelector('.contact-us__map-open');
  var mapModal = document.getElementById('modal-map');

  var openModal = function (modal) {
    var currentModal = document.querySelector('.modal--open');
    if (currentModal) {
      closeModal(currentModal);
    }
    modal.classList.add('modal--open');
    var modalClose = modal.querySelector('.modal__close');
    modalClose.addEventListener('click', onCloseModalClick);
    var modalButtons = modal.querySelectorAll('.modal__button');
    if (modalButtons) {
      modalButtons.forEach(function(button) {
        button.addEventListener('click', onCloseModalClick);
      });
    }
    document.addEventListener('keydown', documentEscHadler);
  };

  var closeModal = function (modal) {
    modal.classList.remove('modal--open');
    document.removeEventListener('keydown', documentEscHadler);
  };

  var documentEscHadler = function (evt) {
    if(evt.keyCode === 27) {
      var modal = document.querySelector('.modal--open');
      closeModal(modal);
    }
  }

  var onCloseModalClick = function (evt) {
    evt.preventDefault();
    var modal = evt.target.closest('.modal');
    closeModal(modal);
    this.removeEventListener('click', onCloseModalClick);
  };

  if (contactOpen && contactModal) {
    contactOpen.addEventListener('click', function(evt) {
      evt.preventDefault();
      openModal(contactModal);
    });
  }

  if (productBuy && cartModal) {
    productBuy.forEach(function(button) {
      button.addEventListener('click', function (evt) {
        evt.preventDefault();
        openModal(cartModal);
      });
    });
  }

  if (mapOpen && mapModal) {
    mapOpen.addEventListener('click', function(evt) {
      evt.preventDefault();
      openModal(mapModal);
    });
  }

})();
