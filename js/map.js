'use strict';

(function () {
  const map = document.querySelector(`.map__pins`);
  const mapFilter = document.querySelector(`.map__filters-container`);

  const errorHandler = (errorText) => {
    const node = document.createElement(`div`);
    node.style.position = `fixed`;
    node.style.top = `40%`;
    node.style.left = `50%`;
    node.style.width = `300px`;
    node.style.height = `200px`;
    node.style.marginLeft = `-150px`;
    node.style.padding = `30px`;
    node.style.fontSize = `30px`;
    node.style.backgroundColor = `red`;
    node.style.zIndex = `100`;
    node.style.color = `#fff`;
    node.style.textAlign = `center`;

    node.textContent = errorText;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const showPins = () => {
    const successHandler = (pins) => {
      const fragment = document.createDocumentFragment();
      for (let pinItem of pins) {
        fragment.appendChild(window.pin.renderPin(pinItem));
      }

      map.appendChild(fragment);
    };

    window.backend.load(successHandler, errorHandler);
  };

  showPins();

  const showCards = (cardNumber) => {
    const successHandler = (cards) => {
      mapFilter.insertAdjacentElement(`beforebegin`, window.card.renderCard(cards[cardNumber]));
    };

    window.backend.load(successHandler, errorHandler);
  };

  showCards(0);
})();
