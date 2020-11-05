'use strict';
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const mainPin = document.querySelector(`.map__pin--main`);
const mainMap = document.querySelector(`.map`);
const submitButton = document.querySelector(`.ad-form__submit`);
const successElement = document.querySelector(`#success`).content.querySelector(`.success`);
const errorElement = document
  .querySelector(`#error`)
  .content.querySelector(`.error`);

const resetButton = document.querySelector(`.ad-form__reset`);
const addressInput = document.querySelector(`#address`);

const PIN_MAIN_DEFAULT = {
  left: 570, top: 375
};

let pins = [];

const turnOffPage = () => {
  const cords = window.utils.getElementCords(mainPin, window.utils.PIN_PARAM.width, window.utils.PIN_PARAM.height);

  window.card.delete();
  addressInput.placeholder = `${cords.left} ${cords.top}`;
  window.form.disabled(adForm);
  window.form.disabled(mapFilters);
  mainMap.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  adForm.reset();
  mapFilters.reset();
  mainPinReset();

  mainPin.addEventListener(`mousedown`, onPageActivationByClick);
  mainPin.addEventListener(`keydown`, onPageActivationByKey);
};

const updatePins = () => {
  window.card.delete();
  window.filter.getInfo(pins);
};

const onSuccess = (data) => {
  pins = data;
  window.filter.getInfo(pins);

  window.form.disabled(adForm, false);
  window.form.disabled(mapFilters, false);
};

const turnOnPage = () => {
  window.backend.load(onSuccess, window.utils.onError);
  updatePins();

  mainMap.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  window.form.changeAddressInput();
};

const mainPinReset = () => {
  mainPin.style.top = PIN_MAIN_DEFAULT.top + `px`;
  mainPin.style.left = PIN_MAIN_DEFAULT.left + `px`;
};

const onPageActivationByClick = (evt) => {
  if (evt.buttons === window.utils.Key.MOUSE_LEFT_BUTTON) {
    turnOnPage();
  }
  mainPin.removeEventListener(`mousedown`, onPageActivationByClick);
};

const onPageActivationByKey = (evt) => {
  if (evt.key === window.utils.Key.ENTER) {
    turnOnPage();
    window.form.changeAddressInput();
  }

  mainPin.removeEventListener(`keydown`, onPageActivationByKey);
};

resetButton.addEventListener(`click`, () => {
  turnOffPage();
});

const onLoad = () => {
  window.utils.showServerStatus(successElement, adForm);
  turnOffPage();
};

const onError = () => {
  window.utils.showServerStatus(errorElement, adForm);
};

adForm.addEventListener(`submit`, (evt) => {
  window.backend.send(new FormData(adForm), onLoad, onError);
  submitButton.disabled = true;

  evt.preventDefault();
});

turnOffPage();
