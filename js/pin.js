'use strict';

(function () {
  const pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const renderPin = function (obj) {
    const pinElement = pin.cloneNode(true);
    const pinImage = pinElement.querySelector(`img`);

    pinElement.style.left = obj.location.x;
    pinElement.style.top = obj.location.y;
    pinImage.src = obj.author.name;

    return pinElement;
  };

  window.pin = {
    renderPin
  };

})();
