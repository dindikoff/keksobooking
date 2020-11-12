"use strict";

const PIN_MAIN_DEFAULT = {
  left: 570, top: 375
};

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

let pins = [];

const turnOffPage = () => {
  const cords = window.utils.getElementCoords(mainPin, window.utils.PIN_PARAM.width, window.utils.PIN_PARAM.height);

  window.card.delete();
  addressInput.placeholder = `${cords.left} ${cords.top}`;
  window.form.setFieldsEnabled(adForm);
  window.form.setFieldsEnabled(mapFilters);
  mainMap.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  adForm.reset();
  mapFilters.reset();
  mainPinReset();

  window.pictures.resetFileInputs();
  mainPin.addEventListener(`mousedown`, onPageActivationByClick);
  mainPin.addEventListener(`keydown`, onPageActivationByKey);
};

const onSuccess = (ads) => {
  pins = ads;
  window.filter.getInfo(pins);

  window.form.setFieldsEnabled(adForm, false);
  window.form.setFieldsEnabled(mapFilters, false);
};

const turnOnPage = () => {
  window.backend.load(onSuccess, window.utils.onError);

  mainMap.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  window.form.doValidation();
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
  mainPin.removeEventListener(`keydown`, onPageActivationByKey);
};

const onPageActivationByKey = (evt) => {
  if (evt.key === window.utils.Key.ENTER) {
    turnOnPage();
    window.form.changeAddressInput();
  }
  mainPin.removeEventListener(`mousedown`, onPageActivationByClick);
  mainPin.removeEventListener(`keydown`, onPageActivationByKey);
};

resetButton.addEventListener(`click`, () => {
  turnOffPage();
});

const onLoad = () => {
  window.utils.showServerStatus(successElement, mainMap);
  turnOffPage();
};

const onError = () => {
  window.utils.showServerStatus(errorElement, mainMap);
};

adForm.addEventListener(`submit`, (evt) => {

  window.backend.send(new FormData(adForm), onLoad, onError);
  submitButton.disabled = true;
  evt.preventDefault();
});

turnOffPage();
