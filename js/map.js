'use strict';

(function () {

  const showPins = function (pins) {
    const fragment = document.createDocumentFragment();

    for (let pinItem of pins) {
      fragment.appendChild(window.pin.renderPin(pinItem));
    }
    return fragment;
  };

  window.map = {
    showPins
  };

  // const adList = window.data.generateAd(window.data.AD_NUMBER);
  // map.appendChild(showPins(adList));
})();
