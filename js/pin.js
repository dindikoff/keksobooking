'use strict';

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
