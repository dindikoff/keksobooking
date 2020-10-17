'use strict';

(function () {
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFilter = document.querySelector(`.map__filters-container`);

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

  window.map = {
    updatePins,
    addCard
  };

})();
