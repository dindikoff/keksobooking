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

    const update = window.debounce((evt) => {
      window.debounce(window.map.updatePins());
      window.debounce(window.pin.renderPinsElements(houseFilterMap[evt.target.value]));
    });

    houseOptions.addEventListener(`change`, update);
  };

  window.filter = {
    housingTypeFilter
  };

})();
