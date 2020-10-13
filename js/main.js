'use strict';
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map__pins`);


const turnOfPage = () => {
  window.form.disabledForm(adForm);
  window.form.disabledForm(mapFilters);
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
};

const turnOnPage = () => {
  window.form.disabledForm(adForm, false);
  window.form.disabledForm(mapFilters, false);
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
};

mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.buttons === window.utils.Key.MOUSE_LEFT_BUTTON) {
    turnOnPage();
    window.form.changeAddressInput();
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === window.utils.Key.ENTER) {
    turnOnPage();
    window.form.changeAddressInput();
  }
});

turnOfPage();
