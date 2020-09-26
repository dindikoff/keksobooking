'use strict';
const PIN = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const PIN_PARAMS = {
  'width': 50,
  'height': 70
};

const AD = {
  'TYPE': [`palace`, `flat`, `house`, `bungalow`],
  'CHECK_IN': [`12:00`, `13:00`, `14:00`],
  'CHECK_OUT': [`12:00`, `13:00`, `14:00`],
  'FEATURES': [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  'PHOTOS': [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ]
};

const AD_NUMBER = 8;

const MAP = document.querySelector(`.map__pins`);
MAP.classList.remove(`map--faded`);

const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomElement = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

const getRandomLocation = (pin, field) => {
  return getRandomInt(pin.width / 2, field.clientWidth - (pin.width / 2));
};

const getRandomLengthString = (arr) => {
  const result = [];
  result.push(arr.slice(0, Math.ceil(Math.random() * arr.length)));
  return result;
};

const generateAd = function (adCount) {
  const adList = [];
  for (let i = 1; i <= adCount; i++) {
    adList.push({
      'author': {
        'name': i < 10 ? `img/avatars/user0${i}.png` : `img/avatars/user${i}.png`,
      },
      'offer': {
        'title': `Some Text`,
        'address': `${getRandomLocation(PIN_PARAMS, MAP)}px`,
        'price': 100,
        'type': getRandomElement(AD.TYPE),
        'rooms': 2,
        'guests': 1,
        'checkin': getRandomElement(AD.CHECK_IN),
        'checkout': getRandomElement(AD.CHECK_OUT),
        'features': getRandomLengthString(AD.FEATURES),
        'description': `Some text`,
        'photos': getRandomLengthString(AD.PHOTOS)
      },
      'location': {
        'x': `${getRandomLocation(PIN_PARAMS, MAP)}px`,
        'y': `${getRandomInt(130, 630)}px`
      }

    });
  }
  return adList;
};

const renderPin = function (obj) {
  const pinElement = PIN.cloneNode(true);
  const pinImage = pinElement.querySelector(`img`);

  pinElement.style.left = obj.location.x;
  pinElement.style.top = obj.location.y;
  pinImage.src = obj.author.name;

  return pinElement;
};

const showPins = function (pins) {
  const fragment = document.createDocumentFragment();

  for (let pin of pins) {
    fragment.appendChild(renderPin(pin));
  }
  return fragment;
};

const adList = generateAd(AD_NUMBER);
MAP.appendChild(showPins(adList));
