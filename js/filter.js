'use strict';

(function () {
  const filterElement = document.querySelector(`.map__filters`);
  filterElement.style.opacity = `1`;

  const getFilterInfo = (data) => {
    const houseType = document.querySelector(`#housing-type`);
    const housePrice = document.querySelector(`#housing-price`);
    const houseRooms = document.querySelector(`#housing-rooms`);
    const houseGuest = document.querySelector(`#housing-guests`);
    const mapFeature = filterElement.querySelectorAll(`[name="features"]`);

    window.state = data;

    const houseTypeFilter = (arr) => {
      const houseFilterMap = {
        'any': window.state,
        'palace': arr.filter((pin) => {
          return pin.offer.type === `palace`;
        }),
        'flat': arr.filter((pin) => {
          return pin.offer.type === `flat`;
        }),
        'house': arr.filter(((pin) => {
          return pin.offer.type === `house`;
        })),
        'bungalow': arr.filter(((pin) => {
          return pin.offer.type === `bungalow`;
        }))
      };

      window.state = houseFilterMap[houseType.value];
    };

    const priceMapFilter = (arr) => {
      const priceFilterMap = {
        'any': arr,
        'middle': arr.filter((pin) => {
          if (pin.offer.price < 10000 || pin.offer.price < 50000) {
            return pin;
          } else {
            return ``;
          }
        }),
        'low': arr.filter((pin) => {
          if (pin.offer.price < 10000) {
            return pin;
          } else {
            return ``;
          }
        }),
        'high': arr.filter((pin) => {
          if (pin.offer.price > 50000) {
            return pin;
          } else {
            return ``;
          }
        })
      };

      window.state = priceFilterMap[housePrice.value];
    };

    const roomMapFilter = (arr) => {
      const roomFilterMap = {
        'any': arr,
        '1': arr.filter((pin) => {
          return pin.offer.rooms === 1;
        }),
        '2': arr.filter((pin) => {
          return pin.offer.rooms === 2;
        }),
        '3': arr.filter((pin) => {
          return pin.offer.rooms === 3;
        })
      };

      window.state = roomFilterMap[houseRooms.value];
    };

    const guestMapFilter = (arr) => {
      const guestFilterMap = {
        'any': arr,
        '2': arr.filter((pin) => {
          return pin.offer.guests === 2;
        }),
        '1': arr.filter((pin) => {
          return pin.offer.guests === 1;
        }),
        '0': arr.filter((pin) => {
          return pin.offer.guests === 0;
        }),
      };
      window.state = guestFilterMap[houseGuest.value];
    };

    const featureMapFilter = (arr) => {
      let featureList = [];

      mapFeature.forEach((element) => {
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

    window.pin.renderPinsElements(window.state);

    const update = window.debounce(() => {
      window.state = data;
      houseTypeFilter(window.state);
      priceMapFilter(window.state);
      roomMapFilter(window.state);
      guestMapFilter(window.state);
      featureMapFilter(window.state);

      window.card.deleteCards();
      window.debounce(window.pin.renderPinsElements(window.state));

    });

    filterElement.addEventListener(`change`, update);
  };

  window.filter = {
    getFilterInfo
  };

})();
