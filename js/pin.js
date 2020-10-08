'use strict';

(function () {
  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const renderPin = function (obj) {
    let pinElement = pin.cloneNode(true);
    const pinImage = pinElement.querySelector(`img`);
    pinElement.style.left = `${obj.location.x}px`;
    pinElement.style.top = `${obj.location.y}px`;
    pinImage.src = obj.author.avatar;

    return pinElement;
  };

  window.pin = {
    renderPin
  };

})();
