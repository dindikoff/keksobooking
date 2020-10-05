'use strict';

(function () {
  const map = document.querySelector(`.map__pins`);

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
  const PIN_PARAMS = {
    'width': 50,
    'height': 70
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
          'address': `${window.utils.getRandomLocation(PIN_PARAMS, map)}px`,
          'price': 100,
          'type': window.utils.getRandomElement(AD.TYPE),
          'rooms': 2,
          'guests': 1,
          'checkin': window.utils.getRandomElement(AD.CHECK_IN),
          'checkout': window.utils.getRandomElement(AD.CHECK_OUT),
          'features': window.utils.getRandomLengthString(AD.FEATURES),
          'description': `Some text`,
          'photos': window.utils.getRandomLengthString(AD.PHOTOS)
        },
        'location': {
          'x': `${window.utils.getRandomLocation(PIN_PARAMS, map)}px`,
          'y': `${window.utils.getRandomInt(130, 630)}px`
        }

      });
    }
    return adList;
  };

  window.data = {
    generateAd,
    PIN_PARAMS,
    AD_NUMBER
  };

})();
