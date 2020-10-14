'use strict';

(function () {
  const map = document.querySelector(`.map__pins`);
  const mapFilter = document.querySelector(`.map__filters-container`);
  const mapFilters = document.querySelector(`.map__filters`);

  let pins = [];

  const updatePins = () => {
    window.utils.removeList(`.map__pin`, () => {
      window.utils.deleteNode(`.map__card`);
    });
    window.filter.housingTypeFilter(pins);

    window.form.disabledForm(mapFilters, false);
  };

  const successHandler = (data) => {
    pins = data;
  };

  window.backend.load(successHandler, window.utils.errorHandler);

  const addCard = (cardNumber) => {
    mapFilter.insertAdjacentElement(`beforebegin`, window.card.renderCard(pins[cardNumber]));
  };

  const showCard = (evtElement) => {
    const mapPins = document.querySelectorAll(`.map__pin`);

    for (let i = 0; i < mapPins.length; i++) {
      if (evtElement.target.parentNode.className === `map__pin map__pin--main`) {
        return;
      } else {
        if (evtElement.target === mapPins[i] || evtElement.target.parentNode === mapPins[i]) {
          window.utils.deleteNode(`.map__card`);
          addCard(i - 1);
        }
      }
    }
  };

  map.addEventListener(`click`, showCard);

  window.map = {
    updatePins
  };

})();
