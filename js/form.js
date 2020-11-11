"use strict";
const RULES = {
  TYPE_PRICE: {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  },
  ROOM_CAPACITY: {
    "1": [1],
    "2": [1, 2],
    "3": [1, 2, 3],
    "100": [0],
  }
};

const adForm = document.querySelector(`.ad-form`);
const addressInput = adForm.querySelector(`#address`);
const mainPin = document.querySelector(`.map__pin--main`);
const timeIn = document.querySelector(`#timein`);
const timeOut = document.querySelector(`#timeout`);
const roomNumber = document.querySelector(`#room_number`);
const roomCapacity = document.querySelector(`#capacity`);

const setFieldsEnabled = (block, enabled = true) => {
  [...block.children].forEach((child) => {
    child.disabled = enabled ? `disabled` : ``;
  });
};

const changeAddressInput = () => {
  const pinCords = window.utils.getElementCoords(mainPin);
  addressInput.value = `${pinCords.left}, ${pinCords.top}`;
};

const checkRoomValidity = (select) => {
  if (
    RULES.ROOM_CAPACITY[roomNumber.value].includes(parseInt(roomCapacity.value, 10))
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

const onCheckRoom = () => {
  checkRoomValidity(roomNumber);
  checkRoomValidity(roomCapacity);
};

const checkRoomValidation = () => {
  checkRoomValidity(roomCapacity);
  roomNumber.addEventListener(`change`, onCheckRoom);
  roomCapacity.addEventListener(`change`, onCheckRoom);
};

const offerPriceValidation = () => {
  const roomType = document.querySelector(`#type`);
  const roomPrice = document.querySelector(`#price`);

  roomPrice.min = RULES.TYPE_PRICE[roomType.value];
  roomPrice.placeholder = RULES.TYPE_PRICE[roomType.value];

  roomType.addEventListener(`change`, () => {
    roomPrice.min = RULES.TYPE_PRICE[roomType.value];
    roomPrice.placeholder = RULES.TYPE_PRICE[roomType.value];
  });
};

timeIn.addEventListener(`change`, () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener(`change`, () => {
  timeIn.value = timeOut.value;
});

const doValidation = () => {
  checkRoomValidation();
  changeAddressInput();
  offerPriceValidation();
};

addressInput.value = `${mainPin.offsetLeft}, ${mainPin.offsetTop}`;

window.form = {
  setFieldsEnabled,
  changeAddressInput,
  doValidation
};
