"use strict";

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
