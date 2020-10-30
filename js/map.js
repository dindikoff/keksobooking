'use strict';

  const mapFilters = document.querySelector(`.map__filters`);

  let pins = [];

  const updatePins = () => {
    window.card.deleteCards();
    window.filter.getFilterInfo(pins);

    window.form.disabledForm(mapFilters, false);
  };

  const successHandler = (data) => {
    pins = data;
  };

  window.backend.load(successHandler, window.utils.errorHandler);

  window.map = {
    updatePins,
  };

