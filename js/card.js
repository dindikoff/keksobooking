"use strict";

const card = document.querySelector(`#card`).content.querySelector(`.popup`);
const map = document.querySelector(`.map__pins`);
const mapFilter = document.querySelector(`.map__filters-container`);

let currentCard;

const offerTypeNames = {
  "flat": `Квартира`,
  "bungalow": `Бунгало`,
  "house": `Дом`,
  "palace": `Дворец`
};

const onCloseModal = () => {
  currentCard = null;
  window.utils.deleteNode(`.map__card`);
  document.removeEventListener(`keydown`, onEscPress);
};

const onEscPress = (evt) => {
  if (evt.key === window.utils.Key.ESC) {
    onCloseModal();
  }
};

const render = (advert) => {
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

  cardImage.src = advert.author.avatar;
  cardAddress.textContent = advert.offer.address;
  cardPrice.textContent = `${advert.offer.price}₽/ночь`;
  cardType.textContent = offerTypeNames[advert.offer.type];
  cardRoomCapacity.textContent = `${window.utils.generateEndings(advert.offer.rooms, [`комната`, `комнаты`, `комнат`])}
    для ${window.utils.generateEndings(advert.offer.guests, [`гостя`, `гостей`, `гостей`])}`;
  cardRoomTime.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  cardFeatures.innerHTML = ``;

  cardFeatures.append(window.utils.showListElements(advert.offer.features, (featuresItem) => {
    const feature = document.createElement(`li`);
    feature.className = `popup__feature popup__feature--${featuresItem}`;

    return feature;
  }));

  cardDescription.textContent = advert.offer.description;

  cardPictures.innerHTML = ``;
  cardPictures.append(window.utils.showListElements(advert.offer.photos, (photo) => {
    const image = document.createElement(`img`);
    image.className = `popup__photo`;
    image.width = `45`;
    image.src = photo;

    return image;
  }));

  cardTitle.textContent = advert.offer.title;

  closeButton.addEventListener(`click`, onCloseModal);
  document.addEventListener(`keydown`, onEscPress);

  return cardEl;
};

const onShowCard = (evtElement) => {
  const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  mapPins.forEach((advert, index) => {
    if (evtElement.target === advert || evtElement.target.parentNode === advert) {
      addCard(index);
      currentCard = index;
    }
  });
};

const addCard = (cardNumber) => {
  if (currentCard !== cardNumber) {
    window.utils.deleteNode(`.map__card`);
    mapFilter.insertAdjacentElement(`beforebegin`, render(window.advertisements[cardNumber]));
  }
};

const deleteEl = () => {
  window.utils.removeList(`.map__pin`, () => {
    window.utils.deleteNode(`.map__card`);
  });
};

map.addEventListener(`click`, onShowCard);

window.card = {
  delete: deleteEl
};
