"use strict";

const adForm = document.querySelector(`.ad-form`);
const addressInput = adForm.querySelector(`#address`);
const mainPin = document.querySelector(`.map__pin--main`);
const timeIn = document.querySelector(`#timein`);
const timeOut = document.querySelector(`#timeout`);
const roomNumber = document.querySelector(`#room_number`);
const roomCapacity = document.querySelector(`#capacity`);

const disabled = (block, isDisabled = true) => {
  for (let field of block.children) {
    if (isDisabled) {
      field.disabled = `disabled`;
    } else {
      field.disabled = ``;
    }
  }
};

const changeAddressInput = () => {
  const pinCords = window.utils.getElementCords(mainPin);
  addressInput.value = `${pinCords.left}, ${pinCords.top}`;
};

const checkRoomValidity = (select) => {
  const roomRulesMap = {
    "1": [1],
    "2": [1, 2],
    "3": [1, 2, 3],
    "100": [0],
  };

  if (
    roomRulesMap[roomNumber.value].includes(parseInt(roomCapacity.value, 10))
  ) {
    select.setCustomValidity(``);
  } else {
    select.setCustomValidity(`
    1 комната — «для 1 гостя»;
    2 комнаты — «для 2 гостей» или «для 1 гостя»;
    3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
    100 комнат — «не для гостей».
    `);
  }
};


checkRoomValidity(roomCapacity);
roomNumber.addEventListener(`change`, (evt) => {
  checkRoomValidity(evt.target);
});

roomCapacity.addEventListener(`change`, (evt) => {
  checkRoomValidity(evt.target);
});

const typeOfHouses = () => {
  const roomType = document.querySelector(`#type`);
  const roomPrice = document.querySelector(`#price`);

  const typeRules = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  roomPrice.setAttribute(`min`, typeRules[roomType.value]);

  roomType.addEventListener(`change`, () => {
    roomPrice.setAttribute(`min`, typeRules[roomType.value]);
  });
};

timeIn.addEventListener(`change`, () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener(`change`, () => {
  timeIn.value = timeOut.value;
});

addressInput.value = `${mainPin.offsetLeft}, ${mainPin.offsetTop}`;
typeOfHouses();

window.form = {
  disabled,
  changeAddressInput,
  typeOfHouses,
};
