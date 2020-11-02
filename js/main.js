'use strict';
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map__pins`);
const mapOverlay = document.querySelector(`.map__overlay`);
const successElement = document.querySelector(`#success`).content.querySelector(`.success`);
const errorElement = document.querySelector(`#error`).content.querySelector(`.error`);
const resetButton = document.querySelector(`.ad-form__reset`);
const submitButton = document.querySelector(`.ad-form__submit`);
const PIN_MAIN_DEFAULT = {
  left: 570, top: 375
};

const turnOffPage = () => {
  window.card.deleteCards(); // Delete List
  window.form.disabledForm(adForm);
  window.form.disabledForm(mapFilters);
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  adForm.reset();
  mapFilters.reset();
  mainPinReset();
};

const turnOnPage = () => {
  window.form.disabledForm(adForm, false);
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  window.map.updatePins();
};

mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.buttons === window.utils.Key.MOUSE_LEFT_BUTTON) {
    turnOnPage();
  }
});

const mainPinReset = () => {
  mainPin.style.top = PIN_MAIN_DEFAULT.top + `px`;
  mainPin.style.left = PIN_MAIN_DEFAULT.left + `px`;
};

const mainPinMove = () => {
  const PinParam = {
    'MIN_TOP': 130,
    'MAX_TOP': 630
  };


  const pinCords = window.utils.getElementCords(mainPin, window.utils.PIN_PARAM.width, window.utils.PIN_PARAM.height);

  if (mainPin.offsetTop >= PinParam.MAX_TOP) {
    mainPin.style.top = `${PinParam.MAX_TOP}px`;
  } else if (mainPin.offsetTop <= PinParam.MIN_TOP) {
    mainPin.style.top = `${PinParam.MIN_TOP}px`;
  }

  if (pinCords.left <= 0) {
    mainPin.style.left = `${0 - (window.utils.PIN_PARAM.width / 2)}px`;
  } else if (pinCords.left > mapOverlay.offsetWidth) {
    mainPin.style.left = `${mapOverlay.offsetWidth - (window.utils.PIN_PARAM.width / 2)}px`;
  }
};

window.move.doMove(mainPin, () => {
  mainPinMove();
  window.form.changeAddressInput();
});

mainPin.addEventListener(`keydown`, function (evt) {

  if (evt.key === window.utils.Key.ENTER) {
    turnOnPage();
    window.form.changeAddressInput();
  }
});

const onLoad = () => {
  window.utils.showServerStatus(successElement, adForm);
  turnOffPage();
};

const onError = () => {
  window.utils.showServerStatus(errorElement, adForm);
};

adForm.addEventListener(`submit`, (evt) => {
  window.form.checkRoomValidity();
  window.form.typeOfHouses();
  submitButton.disabled = true;
  window.backend.send(new FormData(adForm), onLoad, onError);
  evt.preventDefault();
});

resetButton.addEventListener(`click`, () => {
  turnOffPage();
});

turnOffPage();
