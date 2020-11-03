"use strict";

const PIN_PARAM = {
  MIN_TOP:
    130 - window.utils.PIN_PARAM.HEIGHT - window.utils.PIN_PARAM.LEG_HEIGHT,
  MAX_TOP:
    630 - window.utils.PIN_PARAM.HEIGHT - window.utils.PIN_PARAM.LEG_HEIGHT,
};

const mainPin = document.querySelector(`.map__pin--main`);
const mapOverlay = document.querySelector(`.map__overlay`);

const change = (movedElement, cb) => {
  movedElement.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      dragged = true;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      movedElement.style.top = movedElement.offsetTop - shift.y + `px`;
      movedElement.style.left = movedElement.offsetLeft - shift.x + `px`;

      cb();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          movedElement.removeEventListener(`click`, onClickPreventDefault);
        };
        movedElement.addEventListener(`click`, onClickPreventDefault);
      }

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
};

const onMainPinMove = () => {
  const pinCord = window.utils.getElementCoords(mainPin);

  if (mainPin.offsetTop >= PIN_PARAM.MAX_TOP) {
    mainPin.style.top = `${PIN_PARAM.MAX_TOP}px`;
  } else if (mainPin.offsetTop <= PIN_PARAM.MIN_TOP) {
    mainPin.style.top = `${PIN_PARAM.MIN_TOP}px`;
  }

  if (pinCord.left < 0) {
    mainPin.style.left = `${0 - window.utils.PIN_PARAM.WIDTH / 2}px`;
  } else if (pinCord.left > mapOverlay.offsetWidth) {
    mainPin.style.left = `${
      mapOverlay.offsetWidth - window.utils.PIN_PARAM.WIDTH / 2
    }px`;
  }
};

change(mainPin, () => {
  onMainPinMove();
  window.form.changeAddressInput();
});

window.move = {
  change,
};
