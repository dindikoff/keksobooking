'use strict';
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map__pins`);
const mapOverlay = document.querySelector(`.map__overlay`);

const turnOfPage = () => {
  window.form.disabledForm(adForm);
  window.form.disabledForm(mapFilters);
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
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

turnOfPage();
