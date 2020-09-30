'use strict';
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const addressInput = adForm.querySelector(`#address`);

const formSubmit = document.querySelector(`.ad-form__submit`);

const mainPin = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map__pins`);
// const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const PIN_PARAMS = {
  'width': 50,
  'height': 70
};
// const AD_NUMBER = 8;

// const AD = {
//   'TYPE': [`palace`, `flat`, `house`, `bungalow`],
//   'CHECK_IN': [`12:00`, `13:00`, `14:00`],
//   'CHECK_OUT': [`12:00`, `13:00`, `14:00`],
//   'FEATURES': [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
//   'PHOTOS': [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
//     `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
//     `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
//   ]
// };

const KEYS = {
  'ENTER': `Enter`,
  'MOUSE_LEFT_BUTTON': 1
}

// const getRandomInt = function (min = 0, max = 100) {
//   return Math.floor(Math.random() * (max - min)) + min;
// };

// const getRandomElement = (arr) => {
//   return arr[getRandomInt(0, arr.length)];
// };

// const getRandomLocation = (pinElement, field) => {
//   return getRandomInt(pinElement.width / 2, field.clientWidth - (pinElement.width / 2));
// };

// const getRandomLengthString = (arr) => {
//   const MIN_NUMBER_OF_ELEMENTS = 1;
//   return arr.slice(0, getRandomInt(MIN_NUMBER_OF_ELEMENTS, arr.length));
// };

// const generateAd = function (adCount) {
//   const adList = [];
//   for (let i = 1; i <= adCount; i++) {
//     adList.push({
//       'author': {
//         'name': i < 10 ? `img/avatars/user0${i}.png` : `img/avatars/user${i}.png`,
//       },
//       'offer': {
//         'title': `Some Text`,
//         'address': `${getRandomLocation(PIN_PARAMS, map)}px`,
//         'price': 100,
//         'type': getRandomElement(AD.TYPE),
//         'rooms': 2,
//         'guests': 1,
//         'checkin': getRandomElement(AD.CHECK_IN),
//         'checkout': getRandomElement(AD.CHECK_OUT),
//         'features': getRandomLengthString(AD.FEATURES),
//         'description': `Some text`,
//         'photos': getRandomLengthString(AD.PHOTOS)
//       },
//       'location': {
//         'x': `${getRandomLocation(PIN_PARAMS, map)}px`,
//         'y': `${getRandomInt(130, 630)}px`
//       }

//     });
//   }
//   return adList;
// };

// const renderPin = function (obj) {
//   const pinElement = pin.cloneNode(true);
//   const pinImage = pinElement.querySelector(`img`);

//   pinElement.style.left = obj.location.x;
//   pinElement.style.top = obj.location.y;
//   pinImage.src = obj.author.name;

//   return pinElement;
// };

// const showPins = function (pins) {
//   const fragment = document.createDocumentFragment();

//   for (let pinItem of pins) {
//     fragment.appendChild(renderPin(pinItem));
//   }
//   return fragment;
// };

// const adList = generateAd(AD_NUMBER);
// map.appendChild(showPins(adList));
// map.classList.remove(`map--faded`);

// Disable Form

const disabledForm = (block, isDisabled = true) => {
  for (let field of block.children) {
    if (isDisabled) {
      field.disabled = `disabled`;
    } else {
      field.disabled = ``;
    }
  }
};

const turnOfPage = () => {
  disabledForm(adForm);
  disabledForm(mapFilters);
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
};

const turnOnPage = () => {
  disabledForm(adForm, false);
  disabledForm(mapFilters, false);
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
};

mainPin.addEventListener(`mousedown`, (evt) => {
  if (evt.buttons === KEYS.MOUSE_LEFT_BUTTON) {
    turnOnPage();
    changeAddressInput();
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === KEYS.ENTER) {
    turnOnPage();
    changeAddressInput();
  }
});

// Address Field

const changeAddressInput = () => {
  const getLeft = mainPin.offsetLeft + (PIN_PARAMS.width / 2);
  const getTop = mainPin.offsetTop + PIN_PARAMS.height;

  addressInput.value = `${getLeft}, ${getTop}`;
};

// Validation

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
turnOfPage();
