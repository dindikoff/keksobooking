"use strict";

const filterElement = document.querySelector(`.map__filters`);

const getInfo = (data) => {
  const houseType = document.querySelector(`#housing-type`);
  const housePrice = document.querySelector(`#housing-price`);
  const houseRooms = document.querySelector(`#housing-rooms`);
  const houseGuest = document.querySelector(`#housing-guests`);
  const mapFeatures = filterElement.querySelectorAll(`[name="features"]`);

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

  window.state = data;
  const makeData = (arr) => {
    const Filters = {
      type: {
        'any': arr,
        'palace': arr.filter((pin) => {
          return pin.offer.type === `palace`;
        }),
        'flat': arr.filter((pin) => {
          return pin.offer.type === `flat`;
        }),
        'house': arr.filter((pin) => {
          return pin.offer.type === `house`;
        }),
        'bungalow': arr.filter((pin) => {
          return pin.offer.type === `bungalow`;
        }),
      },

      price: {
        'any': arr,
        'middle': arr.filter((pin) => {
          if (
            pin.offer.price < PRICE_RULE.middle.low ||
            pin.offer.price < PRICE_RULE.middle.max
          ) {
            return pin;
          }
          return ``;
        }),
        'low': arr.filter((pin) => {
          if (pin.offer.price < PRICE_RULE.low.max) {
            return pin;
          }
          return ``;
        }),
        'high': arr.filter((pin) => {
          if (pin.offer.price > PRICE_RULE.high.max) {
            return pin;
          }
          return ``;
        }),
      },

      room: {
        'any': arr,
        "1": arr.filter((pin) => {
          return pin.offer.rooms === ROOM_NUMBER.one;
        }),
        "2": arr.filter((pin) => {
          return pin.offer.rooms === ROOM_NUMBER.two;
        }),
        "3": arr.filter((pin) => {
          return pin.offer.rooms === ROOM_NUMBER.three;
        }),
      },

      guests: {
        'any': arr,
        "2": arr.filter((pin) => {
          return pin.offer.guests === GUEST_NUMBER.two;
        }),
        "1": arr.filter((pin) => {
          return pin.offer.guests === GUEST_NUMBER.one;
        }),
        "0": arr.filter((pin) => {
          return pin.offer.guests === GUEST_NUMBER.zero;
        }),
      },
    };
    return Filters;
  };

  const features = (arr) => {
    let featureList = [];

    mapFeatures.forEach((element) => {
      if (element.checked) {
        featureList.push(element.defaultValue);
      }
    });

    const newArray = [];

    arr.forEach((el) => {
      if (window.utils.contains(el.offer.features, featureList)) {
        newArray.push(el);
      }
    });

    window.state = newArray;
  };

  const createNewFilter = (state, type) => {
    const ab = makeData(state);

    switch (type) {
      case `type`:
        window.state = ab.type[houseType.value];
        break;
      case `price`:
        window.state = ab.price[housePrice.value];
        break;
      case `room`:
        window.state = ab.room[houseRooms.value];
        break;
      case `guest`:
        window.state = ab.guests[houseGuest.value];
        break;
      case `features`:
        features(state);
        break;
    }
  };

  window.pin.renderAll(window.state);

  const onUpdate = window.debounce(() => {
    window.state = data;
    createNewFilter(window.state, `type`);
    createNewFilter(window.state, `price`);
    createNewFilter(window.state, `room`);
    createNewFilter(window.state, `guest`);
    createNewFilter(window.state, `features`);

    window.card.delete();
    window.debounce(window.pin.renderAll(window.state));
  });

  filterElement.addEventListener(`change`, onUpdate);
};

window.filter = {
  getInfo,
  status,
};
