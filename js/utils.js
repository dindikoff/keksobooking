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

  const showListElements = (list, cb) => {
    const fragment = document.createDocumentFragment();

    for (let el of list) {
      fragment.append(cb(el));
    }

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

  const deleteNode = (parentClass, nodeClass) => {
    const parentEl = document.querySelector(parentClass);
    parentEl.innerHTML = ``;
    const mapCard = document.querySelector(nodeClass);
    if (mapCard) {
      mapCard.remove();
    }
  };

  const hasExtension = (inputID, exts) => {
    const fileName = inputID.value;
    return (new RegExp(`(` + exts.join(`|`).replace(/\./g, `\\.`) + `)$`)).test(fileName);
  };

  window.utils = {
    Key,
    getRandomInt,
    getRandomElement,
    getRandomLocation,
    getRandomLengthString,
    showListElements,
    endingsGenerator,
    deleteNode,
    hasExtension
  };

})();
