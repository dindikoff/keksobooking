'use strict';

(function () {
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFilter = document.querySelector(`.map__filters-container`);

  let pins = [];

  const updatePins = () => {
    window.card.deleteCards();
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
