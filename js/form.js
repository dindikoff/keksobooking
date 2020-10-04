'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const formSubmit = document.querySelector(`.ad-form__submit`);
  const addressInput = adForm.querySelector(`#address`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const disabledForm = (block, isDisabled = true) => {
    for (let field of block.children) {
      if (isDisabled) {
        field.disabled = `disabled`;
      } else {
        field.disabled = ``;
      }
    }
  };

  const changeAddressInput = () => {
    const getLeft = mainPin.offsetLeft + (window.data.PIN_PARAMS.width / 2);
    const getTop = mainPin.offsetTop + window.data.PIN_PARAMS.height;

    addressInput.value = `${getLeft}, ${getTop}`;
  };

  const checkRoomValidity = () => {
    const roomNumber = document.querySelector(`#room_number`);
    const roomCapacity = document.querySelector(`#capacity`);

    const roomRules = {
      '1': [1],
      '2': [1, 2],
      '3': [1, 2, 3],
      '100': [0]
    };

    if (roomRules[roomNumber.value].includes(parseInt(roomCapacity.value, 10))) {
      roomNumber.setCustomValidity(``);
    } else {
      roomNumber.setCustomValidity(`
      1 комната — «для 1 гостя»;
      2 комнаты — «для 2 гостей» или «для 1 гостя»;
      3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
      100 комнат — «не для гостей».
      `);
    }

  };

  formSubmit.addEventListener(`click`, checkRoomValidity);
  addressInput.value = `${mainPin.offsetLeft}, ${mainPin.offsetTop}`;

  window.form = {
    disabledForm,
    changeAddressInput
  };

})();
