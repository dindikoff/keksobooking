"use strict";

const PRICE_RULE = {
  middle: {
    min: 10000,
    max: 50000,
  },
  low: {
    max: 10000,
  },
  high: {
    max: 50000,
  },
};

const getPriceValue = (price) => {
  if (
    price > PRICE_RULE.middle.min &&
    price < PRICE_RULE.middle.max
  ) {
    return `middle`;
  }

  if (price <= PRICE_RULE.low.max) {
    return `low`;
  }

  if (price <= PRICE_RULE.high.max) {
    return `high`;
  }

  return `any`;
};

const getStringValue = (value) => {
  return value;
};

const getIntegerValue = (value) => {
  return parseInt(value, 10);
};

const Filters = {
  type: {
    getFilterValue: getStringValue,
    getAdValue: getStringValue
  },
  rooms: {
    getFilterValue: getStringValue,
    getAdValue: getStringValue
  },
  guests: {
    getFilterValue: getIntegerValue,
    getAdValue: getIntegerValue
  },
  price: {
    getFilterValue: getStringValue,
    getAdValue: getPriceValue
  }
};

const filterElement = document.querySelector(`.map__filters`);
const getInfo = (data) => {
  const houseType = document.querySelector(`#housing-type`);
  const housePrice = document.querySelector(`#housing-price`);
  const houseRooms = document.querySelector(`#housing-rooms`);
  const houseGuest = document.querySelector(`#housing-guests`);
  const mapFeatures = filterElement.querySelectorAll(`[name="features"]`);

  window.advertisements = data;

  const filterByValue = (value, field) => {
    if (value === `any`) {
      return window.advertisements;
    }

    return window.advertisements.filter((pin) => {
      return Filters[field].getAdValue(pin.offer[field]) === Filters[field].getFilterValue(value);
    });
  };

  const filterByFeatures = (ads) => {
    const featureList = [...mapFeatures].filter((feature) => {
      return feature.checked;
    }).map((feature) => {
      return feature.value;
    });

    return ads.filter((ad) => {
      return window.utils.contains(ad.offer.features, featureList);
    });

  };

  window.pin.renderAll(window.advertisements);

  const onUpdate = window.debounce(() => {
    window.advertisements = data;
    window.advertisements = filterByValue(houseType.value, `type`);
    window.advertisements = filterByValue(houseRooms.value, `rooms`);
    window.advertisements = filterByValue(houseGuest.value, `guests`);
    window.advertisements = filterByValue(housePrice.value, `price`);
    window.advertisements = filterByFeatures(window.advertisements);

    window.card.delete();
    window.debounce(window.pin.renderAll(window.advertisements));
  });

  filterElement.addEventListener(`change`, onUpdate);
};

window.filter = {
  getInfo,
};
