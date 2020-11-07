/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Key = {
  'ENTER': `Enter`,
  'ESC': `Escape`,
  'MOUSE_LEFT_BUTTON': 1
};

const PIN_PARAM = {
  'WIDTH': 65,
  'HEIGHT': 65,
  'LEG_HEIGHT': 22
};

const getRandomInt = function (min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomElement = (arr) => {
  return arr[getRandomInt(0, arr.length)];
};

const getRandomLocation = (pinElement, field) => {
  return getRandomInt(pinElement.width / 2, field.clientWidth - (pinElement.width / 2));
};

const getRandomLengthString = (arr) => {
  const MIN_NUMBER_OF_ELEMENTS = 1;
  return arr.slice(0, getRandomInt(MIN_NUMBER_OF_ELEMENTS, arr.length));
};

const showListElements = (list, cb) => {
  const fragment = document.createDocumentFragment();

  list.forEach((element) => {
    fragment.append(cb(element));
  });

  return fragment;
};

const endingsGenerator = (number, titles) => {
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
  for (let i = 1; i < mapList.length; i++) {
    mapList[i].remove();
  }

};

const hasExtension = (inputID, exts) => {
  const fileName = inputID.value;
  return (new RegExp(`(` + exts.join(`|`).replace(/\./g, `\\.`) + `)$`)).test(fileName);
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

const getElementCords = (element) => {
  const elementCords = {
    left: Math.floor(element.offsetLeft + (PIN_PARAM.WIDTH / 2)),
    top: Math.floor(element.offsetTop + PIN_PARAM.HEIGHT + PIN_PARAM.LEG_HEIGHT)
  };

  return elementCords;
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

    document.removeEventListener(`keydown`, onCloseByEsc);
  };

  const onCloseByEsc = (evt) => {
    if (evt.key === window.utils.Key.ESC) {
      successEl.remove();
      submitButton.disabled = false;
    }

    document.removeEventListener(`keydown`, onCloseByEsc);
    document.removeEventListener(`click`, onCloseByClick);
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
  const found = what.every((r) => where.includes(r));
  return found;
};

const endMatches = (endingsArr, fileName) => {
  const result = endingsArr.some((ending) => {
    return fileName.endsWith(ending);
  });

  return result;
};

window.utils = {
  Key,
  PIN_PARAM,
  getRandomInt,
  getRandomElement,
  getRandomLocation,
  getRandomLengthString,
  showListElements,
  endingsGenerator,
  deleteNode,
  hasExtension,
  onError,
  removeList,
  getElementCords,
  showServerStatus,
  contains,
  endMatches
};

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

const TIMEOUT_IN_MS = 10000;

const networkOperation = (type, URL, onSuccess, onError, data = {}) => {
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
    onError(`Запрос не успел выполниться за ' + xhr.timeout + 'мс'`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.send(data);
};

const load = (onSuccess, onError) => {
  networkOperation(`GET`, Server.GET_URL, onSuccess, onError);
};

const send = (data, onSuccess, onError) => {
  networkOperation(`POST`, Server.POST_URL, onSuccess, onError, data);
};

window.backend = {
  load,
  send,
};

})();

(() => {
/*!********************!*\
  !*** ./js/move.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const mainPin = document.querySelector(`.map__pin--main`);
const mapOverlay = document.querySelector(`.map__overlay`);

const change = (movedElement, cb) => {
  movedElement.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
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

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
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
  const PinParam = {
    MIN_TOP:
      130 - window.utils.PIN_PARAM.HEIGHT - window.utils.PIN_PARAM.LEG_HEIGHT,
    MAX_TOP:
      630 - window.utils.PIN_PARAM.HEIGHT - window.utils.PIN_PARAM.LEG_HEIGHT,
  };

  const pinCords = window.utils.getElementCords(mainPin);

  if (mainPin.offsetTop >= PinParam.MAX_TOP) {
    mainPin.style.top = `${PinParam.MAX_TOP}px`;
  } else if (mainPin.offsetTop <= PinParam.MIN_TOP) {
    mainPin.style.top = `${PinParam.MIN_TOP}px`;
  }

  if (pinCords.left < 0) {
    mainPin.style.left = `${0 - window.utils.PIN_PARAM.WIDTH / 2}px`;
  } else if (pinCords.left > mapOverlay.offsetWidth) {
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

const valueToTypeOffer = {
  'flat': `Квартира`,
  'bungalow': `Бунгало`,
  'house': `Дом`,
  'palace': `Дворец`
};

const onCloseModal = () => {
  window.utils.deleteNode(`.map__card`);
  document.removeEventListener(`keydown`, onEscPress);
};

const onEscPress = (evt) => {
  if (evt.key === window.utils.Key.ESC) {
    onCloseModal();
  }
};

const render = (obj) => {
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

  cardImage.src = obj.author.avatar;
  cardAddress.textContent = obj.offer.address;
  cardPrice.textContent = `${obj.offer.price}₽/ночь`;
  cardType.textContent = valueToTypeOffer[obj.offer.type];
  cardRoomCapacity.textContent = `${window.utils.endingsGenerator(obj.offer.rooms, [`комната`, `комнаты`, `комнат`])}
    для ${window.utils.endingsGenerator(obj.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
  cardRoomTime.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  cardFeatures.innerHTML = ``;
  cardFeatures.append(window.utils.showListElements(obj.offer.features, (el) => {
    const feature = document.createElement(`li`);
    feature.className = `popup__feature popup__feature--${el}`;

    return feature;
  }));

  cardDescription.textContent = obj.offer.description;

  cardPictures.innerHTML = ``;
  cardPictures.append(window.utils.showListElements(obj.offer.photos, (el) => {
    const image = document.createElement(`img`);
    image.className = `popup__photo`;
    image.width = `45`;
    image.src = el;

    return image;
  }));

  cardTitle.textContent = obj.offer.title;

  closeButton.addEventListener(`click`, onCloseModal);
  document.addEventListener(`keydown`, onEscPress);

  return cardEl;
};

const onShowCard = (evtElement) => {
  const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  mapPins.forEach((el, index) => {
    if (evtElement.target === el || evtElement.target.parentNode === el) {
      window.utils.deleteNode(`.map__card`);
      addCard(index);
    }
  });
};

const addCard = (cardNumber) => {
  mapFilter.insertAdjacentElement(`beforebegin`, render(window.state[cardNumber]));
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

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const map = document.querySelector(`.map__pins`);

const render = function (obj) {
  const pinElement = pin.cloneNode(true);
  const pinImage = pinElement.querySelector(`img`);
  pinElement.style.left = `${obj.location.x}px`;
  pinElement.style.top = `${obj.location.y}px`;
  pinImage.src = obj.author.avatar;

  return pinElement;
};

const renderAll = (pins) => {
  const MAX_AD_NUMBER = 5;
  const theNumber = pins.length < MAX_AD_NUMBER ? pins.length : MAX_AD_NUMBER;
  const fragment = document.createDocumentFragment();

  for (let pinItem = 0; pinItem < theNumber; pinItem++) {
    fragment.appendChild(render(pins[pinItem]));
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

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500; // ms

window.debounce = function (cb) {
  let lastTimeout = null;

  return function (...args) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

(() => {
/*!************************!*\
  !*** ./js/pictures.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const userPictureInput = document.querySelector(`#avatar`);
const userPictureImage = document.querySelector(`.ad-form-header__preview img`);

const adPictureInput = document.querySelector(`#images`);
const adPictureImage = document.querySelector(`.ad-form__photo`);

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const onChangePicture = (inputEl, cb) => {
  const file = inputEl.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.utils.endMatches(FILE_TYPES, fileName);

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

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const filterElement = document.querySelector(`.map__filters`);

const getInfo = (data) => {
  const houseType = document.querySelector(`#housing-type`);
  const housePrice = document.querySelector(`#housing-price`);
  const houseRooms = document.querySelector(`#housing-rooms`);
  const houseGuest = document.querySelector(`#housing-guests`);
  const mapFeatures = filterElement.querySelectorAll(`[name="features"]`);

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

  const ROOM_NUMBER = {
    one: 1,
    two: 2,
    three: 3,
  };

  const GUEST_NUMBER = {
    zero: 0,
    one: 1,
    two: 2,
  };

  window.state = data;
  const makeData = (arr) => {
    const Filters = {
      type: {
        'any': arr,
        'palace': arr.filter((pin) => {
          return pin.offer.type === `palace`;
        }),
        'flat': arr.filter((pin) => {
          return pin.offer.type === `flat`;
        }),
        'house': arr.filter((pin) => {
          return pin.offer.type === `house`;
        }),
        'bungalow': arr.filter((pin) => {
          return pin.offer.type === `bungalow`;
        }),
      },

      price: {
        'any': arr,
        'middle': arr.filter((pin) => {
          if (
            pin.offer.price < PRICE_RULE.middle.low ||
            pin.offer.price < PRICE_RULE.middle.max
          ) {
            return pin;
          }
          return ``;
        }),
        'low': arr.filter((pin) => {
          if (pin.offer.price < PRICE_RULE.low.max) {
            return pin;
          }
          return ``;
        }),
        'high': arr.filter((pin) => {
          if (pin.offer.price > PRICE_RULE.high.max) {
            return pin;
          }
          return ``;
        }),
      },

      room: {
        'any': arr,
        "1": arr.filter((pin) => {
          return pin.offer.rooms === ROOM_NUMBER.one;
        }),
        "2": arr.filter((pin) => {
          return pin.offer.rooms === ROOM_NUMBER.two;
        }),
        "3": arr.filter((pin) => {
          return pin.offer.rooms === ROOM_NUMBER.three;
        }),
      },

      guests: {
        'any': arr,
        "2": arr.filter((pin) => {
          return pin.offer.guests === GUEST_NUMBER.two;
        }),
        "1": arr.filter((pin) => {
          return pin.offer.guests === GUEST_NUMBER.one;
        }),
        "0": arr.filter((pin) => {
          return pin.offer.guests === GUEST_NUMBER.zero;
        }),
      },
    };
    return Filters;
  };

  const features = (arr) => {
    let featureList = [];

    mapFeatures.forEach((element) => {
      if (element.checked) {
        featureList.push(element.defaultValue);
      }
    });

    const newArray = [];

    arr.forEach((el) => {
      if (window.utils.contains(el.offer.features, featureList)) {
        newArray.push(el);
      }
    });

    window.state = newArray;
  };

  const createNewFilter = (state, type) => {
    const ab = makeData(state);

    switch (type) {
      case `type`:
        window.state = ab.type[houseType.value];
        break;
      case `price`:
        window.state = ab.price[housePrice.value];
        break;
      case `room`:
        window.state = ab.room[houseRooms.value];
        break;
      case `guest`:
        window.state = ab.guests[houseGuest.value];
        break;
      case `features`:
        features(state);
        break;
    }
  };

  window.pin.renderAll(window.state);

  const onUpdate = window.debounce(() => {
    window.state = data;
    createNewFilter(window.state, `type`);
    createNewFilter(window.state, `price`);
    createNewFilter(window.state, `room`);
    createNewFilter(window.state, `guest`);
    createNewFilter(window.state, `features`);

    window.card.delete();
    window.debounce(window.pin.renderAll(window.state));
  });

  filterElement.addEventListener(`change`, onUpdate);
};

window.filter = {
  getInfo,
  status,
};

})();

/******/ })()
;