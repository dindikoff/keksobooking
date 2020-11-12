/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PIN_PARAM = {
  "WIDTH": 65,
  "HEIGHT": 65,
  "LEG_HEIGHT": 22
};

const Key = {
  "ENTER": `Enter`,
  "ESC": `Escape`,
  "MOUSE_LEFT_BUTTON": 1
};

const getRandomInt = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomElement = (elements) => {
  return elements[getRandomInt(0, elements.length)];
};

const getRandomLocation = (pinElement, field) => {
  return getRandomInt(pinElement.width / 2, field.clientWidth - (pinElement.width / 2));
};

const getRandomLengthString = (elements) => {
  const MIN_NUMBER_OF_ELEMENTS = 1;
  return elements.slice(0, getRandomInt(MIN_NUMBER_OF_ELEMENTS, elements.length));
};

const showListElements = (list, cb) => {
  const fragment = document.createDocumentFragment();

  list.forEach((element) => {
    fragment.append(cb(element));
  });

  return fragment;
};

const generateEndings = (number, titles) => {
  const decCache = [];
  const decCases = [2, 0, 1, 1, 1, 2];
  if (!decCache[number]) {
    decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
  }
  return `${number} ${titles[decCache[number]]}`;
};

const deleteNode = (nodeClass) => {
  const mapCard = document.querySelector(nodeClass);
  if (mapCard) {
    mapCard.remove();
  }
};

const removeList = (domList, cb) => {
  const mapList = document.querySelectorAll(domList);
  cb();

  mapList.forEach((domElement, index) => {
    return (index > 0) ? domElement.remove() : ``;
  });

};

const onError = (errorText) => {
  const node = document.createElement(`div`);
  node.style.position = `fixed`;
  node.style.top = `40%`;
  node.style.left = `50%`;
  node.style.width = `300px`;
  node.style.height = `200px`;
  node.style.marginLeft = `-150px`;
  node.style.padding = `30px`;
  node.style.fontSize = `30px`;
  node.style.backgroundColor = `red`;
  node.style.zIndex = `100`;
  node.style.color = `#fff`;
  node.style.textAlign = `center`;

  node.textContent = errorText;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const getElementCoords = (element) => {
  return {
    left: Math.floor(element.offsetLeft + (PIN_PARAM.WIDTH / 2)),
    top: Math.floor(element.offsetTop + PIN_PARAM.HEIGHT + PIN_PARAM.LEG_HEIGHT)
  };
};

const showServerStatus = (element, placeToShow) => {

  const successEl = element.cloneNode(true);
  const button = successEl.querySelector(`.error__button`);
  const submitButton = document.querySelector(`.ad-form__submit`);
  placeToShow.append(successEl);

  const onCloseByClick = (evt) => {
    if (evt.target.parentNode !== successEl) {
      successEl.remove();
      submitButton.disabled = false;
    }
  };

  const onCloseByEsc = (evt) => {
    if (evt.key === window.utils.Key.ESC) {
      successEl.remove();
      submitButton.disabled = false;
    }
  };

  if (button) {
    button.addEventListener(`click`, () => {
      successEl.remove();
      submitButton.disabled = false;
    });
  }

  document.addEventListener(`keydown`, onCloseByEsc);
  successEl.addEventListener(`click`, onCloseByClick);
};

const contains = (where, what) => {
  return what.every((r) => where.includes(r));
};

const isWordEndings = (endingsList, fileName) => {
  return endingsList.some((ending) => {
    return fileName.endsWith(ending);
  });
};

window.utils = {
  Key,
  PIN_PARAM,
  getRandomInt,
  getRandomElement,
  getRandomLocation,
  getRandomLengthString,
  showListElements,
  generateEndings,
  deleteNode,
  onError,
  removeList,
  getElementCoords,
  showServerStatus,
  contains,
  isWordEndings
};

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const TIMEOUT_IN_MS = 10000;
const Server = {
  GET_URL: `https://21.javascript.pages.academy/keksobooking/data`,
  POST_URL: `https://21.javascript.pages.academy/keksobooking`,
};

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const createRequest = (type, URL, onSuccess, onError, data = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(`${type}`, URL);

  xhr.addEventListener(`load`, () => {
    switch (xhr.status) {
      case StatusCode.OK:
        onSuccess(xhr.response);
        break;
      case StatusCode.BAD_REQUEST:
        onError(`Ошибка в запросе! ${xhr.status} ${xhr.statusText}`);
        break;
      case StatusCode.NOT_FOUND:
        onError(`Страница не найдена! ${xhr.status} ${xhr.statusText}`);
        break;
      case StatusCode.SERVER_ERROR:
        onError(
            `Серверная ошибка! Попробуйте позже. ${xhr.status} ${xhr.statusText}`
        );
        break;

      default:
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Ошибка! Проверьте Ваше соединение с интернетом!`);
  });

  xhr.addEventListener(`timeout`, () => {

    onError(`Запрос не успел выполниться за ${xhr.timeout} + 'мс'`);

  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.send(data);
};

const load = (onSuccess, onError) => {
  createRequest(`GET`, Server.GET_URL, onSuccess, onError);
};

const send = (data, onSuccess, onError) => {
  createRequest(`POST`, Server.POST_URL, onSuccess, onError, data);
};

window.backend = {
  load,
  send,
};

})();

(() => {
/*!************************!*\
  !*** ./js/pictures.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_PICTURE = `img/muffin-grey.svg`;

const userPictureInput = document.querySelector(`#avatar`);
const userPictureImage = document.querySelector(`.ad-form-header__preview img`);

const adPictureInput = document.querySelector(`#images`);
const adPictureImage = document.querySelector(`.ad-form__photo`);

const resetFileInputs = () => {
  userPictureImage.src = DEFAULT_PICTURE;
  adPictureImage.style.backgroundImage = ``;
};

const onChangePicture = (inputElement, cb) => {
  const file = inputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.utils.isWordEndings(FILE_TYPES, fileName);

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      cb(reader);
    });

    reader.readAsDataURL(file);
  }
};

userPictureInput.addEventListener(`change`, () => {
  onChangePicture(userPictureInput, (reader) => {
    userPictureImage.src = reader.result;
  });
});

adPictureInput.addEventListener(`change`, () => {
  onChangePicture(adPictureInput, (reader) => {
    adPictureImage.style.backgroundImage = `url(${reader.result})`;
    adPictureImage.style.backgroundPosition = `center center`;
    adPictureImage.style.backgroundSize = `100%`;
  });
});

window.pictures = {
  resetFileInputs
};

})();

(() => {
/*!********************!*\
  !*** ./js/move.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const PIN_PARAM = {
  MIN_TOP:
    130 - window.utils.PIN_PARAM.HEIGHT - window.utils.PIN_PARAM.LEG_HEIGHT,
  MAX_TOP:
    630 - window.utils.PIN_PARAM.HEIGHT - window.utils.PIN_PARAM.LEG_HEIGHT,
};

const mainPin = document.querySelector(`.map__pin--main`);
const mapOverlay = document.querySelector(`.map__overlay`);

const change = (movedElement, cb) => {
  movedElement.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      dragged = true;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      movedElement.style.top = movedElement.offsetTop - shift.y + `px`;
      movedElement.style.left = movedElement.offsetLeft - shift.x + `px`;

      cb();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          movedElement.removeEventListener(`click`, onClickPreventDefault);
        };
        movedElement.addEventListener(`click`, onClickPreventDefault);
      }

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
};

const onMainPinMove = () => {
  const pinCord = window.utils.getElementCoords(mainPin);

  if (mainPin.offsetTop >= PIN_PARAM.MAX_TOP) {
    mainPin.style.top = `${PIN_PARAM.MAX_TOP}px`;
  } else if (mainPin.offsetTop <= PIN_PARAM.MIN_TOP) {
    mainPin.style.top = `${PIN_PARAM.MIN_TOP}px`;
  }

  if (pinCord.left < 0) {
    mainPin.style.left = `${0 - window.utils.PIN_PARAM.WIDTH / 2}px`;
  } else if (pinCord.left > mapOverlay.offsetWidth) {
    mainPin.style.left = `${
      mapOverlay.offsetWidth - window.utils.PIN_PARAM.WIDTH / 2
    }px`;
  }
};

change(mainPin, () => {
  onMainPinMove();
  window.form.changeAddressInput();
});

window.move = {
  change,
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const card = document.querySelector(`#card`).content.querySelector(`.popup`);
const map = document.querySelector(`.map__pins`);
const mapFilter = document.querySelector(`.map__filters-container`);

let currentCard;

const offerTypeNames = {
  "flat": `Квартира`,
  "bungalow": `Бунгало`,
  "house": `Дом`,
  "palace": `Дворец`
};

const onCloseModal = () => {
  currentCard = null;
  window.utils.deleteNode(`.map__card`);
  document.removeEventListener(`keydown`, onEscPress);
};

const onEscPress = (evt) => {
  if (evt.key === window.utils.Key.ESC) {
    onCloseModal();
  }
};
const render = (advert) => {

  const cardEl = card.cloneNode(true);

  const cardImage = cardEl.querySelector(`.popup__avatar`);
  const cardTitle = cardEl.querySelector(`.popup__title`);
  const cardAddress = cardEl.querySelector(`.popup__text--address`);
  const cardPrice = cardEl.querySelector(`.popup__text--price`);
  const cardType = cardEl.querySelector(`.popup__type`);
  const cardRoomCapacity = cardEl.querySelector(`.popup__text--capacity`);
  const cardRoomTime = cardEl.querySelector(`.popup__text--time`);
  const cardFeatures = cardEl.querySelector(`.popup__features`);
  const cardDescription = cardEl.querySelector(`.popup__description`);
  const cardPictures = cardEl.querySelector(`.popup__photos`);
  const closeButton = cardEl.querySelector(`.popup__close`);

  cardImage.src = advert.author.avatar;
  cardAddress.textContent = advert.offer.address;
  cardPrice.textContent = `${advert.offer.price}₽/ночь`;
  cardType.textContent = offerTypeNames[advert.offer.type];
  cardRoomCapacity.textContent = `${window.utils.generateEndings(advert.offer.rooms, [`комната`, `комнаты`, `комнат`])}
    для ${window.utils.generateEndings(advert.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
  cardRoomTime.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  cardFeatures.innerHTML = ``;

  cardFeatures.append(window.utils.showListElements(advert.offer.features, (featuresItem) => {
    const feature = document.createElement(`li`);
    feature.className = `popup__feature popup__feature--${featuresItem}`;

    return feature;
  }));

  cardDescription.textContent = advert.offer.description;

  cardPictures.innerHTML = ``;
  cardPictures.append(window.utils.showListElements(advert.offer.photos, (photo) => {
    const image = document.createElement(`img`);
    image.className = `popup__photo`;
    image.width = `45`;
    image.src = photo;

    return image;
  }));

  cardTitle.textContent = advert.offer.title;

  closeButton.addEventListener(`click`, onCloseModal);
  document.addEventListener(`keydown`, onEscPress);

  return cardEl;
};

const onShowCard = (evtElement) => {
  const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  mapPins.forEach((advert, index) => {
    if (evtElement.target === advert || evtElement.target.parentNode === advert) {
      addCard(index);
      currentCard = index;
    }
  });
};

const addCard = (cardNumber) => {
  if (currentCard !== cardNumber) {
    window.utils.deleteNode(`.map__card`);
    mapFilter.insertAdjacentElement(`beforebegin`, render(window.advertisements[cardNumber]));
  }
};

const deleteEl = () => {
  window.utils.removeList(`.map__pin`, () => {
    window.utils.deleteNode(`.map__card`);
  });
};

map.addEventListener(`click`, onShowCard);

window.card = {
  delete: deleteEl
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

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

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MAX_AD_NUMBER = 5;

const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const map = document.querySelector(`.map__pins`);

const render = (ad) => {
  const pinElement = pin.cloneNode(true);
  const pinImage = pinElement.querySelector(`img`);
  pinElement.style.left = `${ad.location.x}px`;
  pinElement.style.top = `${ad.location.y}px`;
  pinImage.src = ad.author.avatar;

  return pinElement;
};

const renderAll = (pins) => {
  const theNumber = pins.length < MAX_AD_NUMBER ? pins.length : MAX_AD_NUMBER;
  const fragment = document.createDocumentFragment();

  for (let pinItem = 0; pinItem < theNumber; pinItem++) {
    let pinObject = pins[pinItem];

    if (pinObject.hasOwnProperty(`offer`)) {
      fragment.appendChild(render(pinObject));
    }
  }

  map.appendChild(fragment);
};

window.pin = {
  render,
  renderAll
};

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500; // ms

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PRICE_RULE = {
  middle: {
    min: 10000,
    max: 50000,
  },
  low: {
    max: 10000,
  },
  high: {
    max: 50000,
  },
};

const getPriceValue = (price) => {
  if (
    price > PRICE_RULE.middle.min &&
    price < PRICE_RULE.middle.max
  ) {
    return `middle`;
  }

  if (price <= PRICE_RULE.low.max) {
    return `low`;
  }

  if (price <= PRICE_RULE.high.max) {
    return `high`;
  }

  return `any`;
};

const getStringValue = (value) => {
  return value;
};

const getIntegerValue = (value) => {
  return parseInt(value, 10);
};

const Filters = {
  type: {
    getFilterValue: getStringValue,
    getAdValue: getStringValue
  },
  rooms: {
    getFilterValue: getStringValue,
    getAdValue: getStringValue
  },
  guests: {
    getFilterValue: getIntegerValue,
    getAdValue: getIntegerValue
  },
  price: {
    getFilterValue: getStringValue,
    getAdValue: getPriceValue
  }
};

const filterElement = document.querySelector(`.map__filters`);
const getInfo = (data) => {
  const houseType = document.querySelector(`#housing-type`);
  const housePrice = document.querySelector(`#housing-price`);
  const houseRooms = document.querySelector(`#housing-rooms`);
  const houseGuest = document.querySelector(`#housing-guests`);
  const mapFeatures = filterElement.querySelectorAll(`[name="features"]`);

  window.advertisements = data;

  const filterByValue = (value, field) => {
    if (value === `any`) {
      return window.advertisements;
    }

    return window.advertisements.filter((pin) => {
      return Filters[field].getAdValue(pin.offer[field]) === Filters[field].getFilterValue(value);
    });
  };

  const filterByFeatures = (ads) => {
    const featureList = [...mapFeatures].filter((feature) => {
      return feature.checked;
    }).map((feature) => {
      return feature.value;
    });

    return ads.filter((ad) => {
      if (window.utils.contains(ad.offer.features, featureList)) {
        return ad;
      }
      return null;
    });

  };

  window.pin.renderAll(window.advertisements);

  const onUpdate = window.debounce(() => {
    window.advertisements = data;
    window.advertisements = filterByValue(houseType.value, `type`);
    window.advertisements = filterByValue(houseRooms.value, `rooms`);
    window.advertisements = filterByValue(houseGuest.value, `guests`);
    window.advertisements = filterByValue(housePrice.value, `price`);
    window.advertisements = filterByFeatures(window.advertisements);

    window.card.delete();
    window.debounce(window.pin.renderAll(window.advertisements));
  });

  filterElement.addEventListener(`change`, onUpdate);
};

window.filter = {
  getInfo,
};

})();

/******/ })()
;