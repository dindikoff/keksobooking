'use strict';

(function () {
  const card = document.querySelector(`#card`).content.querySelector(`.popup`);

  const offerType = (type) => {
    let typeIs;
    switch (type) {
      case `flat`:
        typeIs = `Квартира`;
        break;

      case `bungalow`:
        typeIs = `Бунгало`;
        break;

      case `house`:
        typeIs = `Дом`;
        break;

      case `palace`:
        typeIs = `Дворец`;
        break;
    }
    return typeIs;
  };

  const closeModal = () => {
    window.utils.deleteNode(`.map__filters-container`, `.map__card`);
    document.removeEventListener(`keydown`, onEscPress);
  };

  const onEscPress = (evt) => {
    if (evt.key === window.utils.Key.ESC) {
      closeModal();
    }
  };

  const renderCard = (obj) => {
    const cardEl = card.cloneNode(true);

    const cardImage = cardEl.querySelector(`.popup__avatar`);
    const cardTitle = cardEl.querySelector(`.popup__title`);
    const cardAddress = cardEl.querySelector(`.popup__text--address`);
    const cardPrice = cardEl.querySelector(`.popup__text--price`);
    const cardType = cardEl.querySelector(`.popup__type`);
    const cardRoomCapacity = cardEl.querySelector(`.popup__text--capacity`);
    const cardRoomTime = cardEl.querySelector(`.popup__text--time`);
    const cardFeatures = cardEl.querySelector(`.popup__features`);
    const cardDescription = cardEl.querySelector(`.popup__description`);
    const cardPictures = cardEl.querySelector(`.popup__photos`);
    const closeButton = cardEl.querySelector(`.popup__close`);

    cardImage.src = obj.author.avatar;
    cardAddress.textContent = obj.offer.address;
    cardPrice.textContent = `${obj.offer.price}₽/ночь`;
    cardType.textContent = offerType(obj.offer.type);
    cardRoomCapacity.textContent = `${window.utils.endingsGenerator(obj.offer.rooms, [`комната`, `комнаты`, `комнат`])}
    для ${window.utils.endingsGenerator(obj.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
    cardRoomTime.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
    cardFeatures.innerHTML = ``;
    cardFeatures.append(window.utils.showListElements(obj.offer.features, (el) => {
      const feature = document.createElement(`li`);
      feature.className = `popup__feature popup__feature--${el}`;

      return feature;
    }));

    cardDescription.textContent = obj.offer.description;

    cardPictures.innerHTML = ``;
    cardPictures.append(window.utils.showListElements(obj.offer.photos, (el) => {
      const image = document.createElement(`img`);
      image.className = `popup__photo`;
      image.width = `45`;
      image.src = el;

      return image;
    }));

    cardTitle.textContent = obj.offer.title;

    closeButton.addEventListener(`click`, closeModal);
    document.addEventListener(`keydown`, onEscPress);

    return cardEl;
  };

  window.card = {
    renderCard
  };

})();
