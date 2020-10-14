'use strict';

(function () {
  const filterElement = document.querySelector(`.map__filters`);
  filterElement.style.opacity = `1`;

  const housingTypeFilter = (data) => {
    const houseOptions = document.querySelector(`#housing-type`);
    const houseFilterMap = {
      'any': data,
      'palace': data.filter((pin) => {
        return pin.offer.type === `palace`;
      }),
      'flat': data.filter((pin) => {
        return pin.offer.type === `flat`;
      }),
      'house': data.filter(((pin) => {
        return pin.offer.type === `house`;
      })),
      'bungalow': data.filter(((pin) => {
        return pin.offer.type === `bungalow`;
      }))
    };

    window.pin.renderPinsElements(houseFilterMap[houseOptions.value]);

    houseOptions.addEventListener(`change`, (evt) => {
      window.map.updatePins();
      window.pin.renderPinsElements(houseFilterMap[evt.target.value]);
    });
  };

  window.filter = {
    housingTypeFilter
  };

})();
