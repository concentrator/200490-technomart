'use strict';

var contactOpen = document.querySelector('.contact-us__button');
var contactModal = document.querySelector('.modal-contact');
var contactClose = contactModal.querySelector('.modal-contact__close');

var openModal = function (modal) {
  if(!modal.classList.contains('modal--open')) {
    modal.classList.add('modal--open');
  }
  document.addEventListener('keydown', documentEscHadler);
  contactClose.addEventListener('click', closeContactModal);
};

var documentEscHadler = function (evt) {
  if(evt.keyCode === 27) {
    closeContactModal();
  }
}

var closeContactModal = function (evt) {
  contactModal.classList.remove('modal--open');
  document.removeEventListener('keydown', documentEscHadler);
  contactClose.removeEventListener('click', closeContactModal);
};

contactOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  openModal(contactModal);
});
