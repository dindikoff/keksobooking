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

const ROOM_NUMBER = {
  one: 1,
  two: 2,
  three: 3,
};

const GUEST_NUMBER = {
  zero: 0,
  one: 1,
  two: 2,
};

const filterElement = document.querySelector(`.map__filters`);
const getInfo = (data) => {
  const houseType = document.querySelector(`#housing-type`);
  const housePrice = document.querySelector(`#housing-price`);
  const houseRooms = document.querySelector(`#housing-rooms`);
  const houseGuest = document.querySelector(`#housing-guests`);
  const mapFeatures = filterElement.querySelectorAll(`[name="features"]`);

  window.advertisements = data;

  const filterByType = (ads) => {
    return {
      "any": ads,
      "palace": ads.filter((pin) => {
        return pin.offer.type === `palace`;
      }),
      "flat": ads.filter((pin) => {
        return pin.offer.type === `flat`;
      }),
      "house": ads.filter((pin) => {
        return pin.offer.type === `house`;
      }),
      "bungalow": ads.filter((pin) => {
        return pin.offer.type === `bungalow`;
      })
    };
  };

  const filterByPrice = (ads) => {
    return {
      "any": ads,
      "middle": ads.filter((ad) => {
        if (
          ad.offer.price < PRICE_RULE.middle.low ||
          ad.offer.price < PRICE_RULE.middle.max
        ) {
          return ad;
        }
        return ``;
      }),
      "low": ads.filter((ad) => {
        if (ad.offer.price < PRICE_RULE.low.max) {
          return ad;
        }
        return ``;
      }),
      "high": ads.filter((ad) => {
        if (ad.offer.price > PRICE_RULE.high.max) {
          return ad;
        }
        return ``;
      })
    };
  };

  const filterByRooms = (ads) => {
    return {
      "any": ads,
      "1": ads.filter((pin) => {
        return pin.offer.rooms === ROOM_NUMBER.one;
      }),
      "2": ads.filter((pin) => {
        return pin.offer.rooms === ROOM_NUMBER.two;
      }),
      "3": ads.filter((pin) => {
        return pin.offer.rooms === ROOM_NUMBER.three;
      }),
    };
  };

  const filterByGuests = (ads) => {
    return {
      "any": ads,
      "2": ads.filter((pin) => {
        return pin.offer.guests === GUEST_NUMBER.two;
      }),
      "1": ads.filter((pin) => {
        return pin.offer.guests === GUEST_NUMBER.one;
      }),
      "0": ads.filter((pin) => {
        return pin.offer.guests === GUEST_NUMBER.zero;
      }),
    };
  };

  const filterByFeatures = (ads) => {
    let featureList = [];

    mapFeatures.forEach((feature) => {
      if (feature.checked) {
        featureList.push(feature.defaultValue);
      }
    });

    const newAdvertisements = [];

    ads.forEach((ad) => {
      if (window.utils.contains(ad.offer.features, featureList)) {
        newAdvertisements.push(ad);
      }
    });

    return newAdvertisements;
  };

  const createNewFilter = (filter, state, value) => {
    window.advertisements = (value) ? filter(state)[value] : filter(state);
  };


  window.pin.renderAll(window.advertisements);

  const onUpdate = window.debounce(() => {
    window.advertisements = data;

    createNewFilter(filterByType, window.advertisements, houseType.value);
    createNewFilter(filterByPrice, window.advertisements, housePrice.value);
    createNewFilter(filterByRooms, window.advertisements, houseRooms.value);
    createNewFilter(filterByGuests, window.advertisements, houseGuest.value);
    createNewFilter(filterByFeatures, window.advertisements);

    window.card.delete();
    window.debounce(window.pin.renderAll(window.advertisements));
  });

  filterElement.addEventListener(`change`, onUpdate);
};

window.filter = {
  getInfo,
};
