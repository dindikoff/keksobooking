'use strict';

(function () {

  const Key = {
    'ENTER': `Enter`,
    'MOUSE_LEFT_BUTTON': 1
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

  window.utils = {
    Key,
    getRandomInt,
    getRandomElement,
    getRandomLocation,
    getRandomLengthString
  };

})();
