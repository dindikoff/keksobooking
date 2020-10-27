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
          'house': arr.filter(((pin) => {
            return pin.offer.type === `house`;
          })),
          'bungalow': arr.filter(((pin) => {
            return pin.offer.type === `bungalow`;
          }))
        },

        price: {
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
        },

        room: {
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
        },

        guests: {
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
        }
      };
      return Filters;
    };

    const features = (arr) => {
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

    window.pin.renderPinsElements(window.state);

    const update = window.debounce(() => {
      window.state = data;
      createNewFilter(window.state, `type`);
      createNewFilter(window.state, `price`);
      createNewFilter(window.state, `room`);
      createNewFilter(window.state, `guest`);
      createNewFilter(window.state, `features`);

      window.card.deleteCards();
      window.debounce(window.pin.renderPinsElements(window.state));

    });

    filterElement.addEventListener(`change`, update);
  };

  window.filter = {
    getFilterInfo
  };

})();
