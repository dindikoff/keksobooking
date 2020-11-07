'use strict';

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
