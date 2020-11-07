"use strict";

const mainPin = document.querySelector(`.map__pin--main`);
const mapOverlay = document.querySelector(`.map__overlay`);

const change = (movedElement, cb) => {
  movedElement.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
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

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
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
  const PinParam = {
    MIN_TOP:
      130 - window.utils.PIN_PARAM.HEIGHT - window.utils.PIN_PARAM.LEG_HEIGHT,
    MAX_TOP:
      630 - window.utils.PIN_PARAM.HEIGHT - window.utils.PIN_PARAM.LEG_HEIGHT,
  };

  const pinCords = window.utils.getElementCords(mainPin);

  if (mainPin.offsetTop >= PinParam.MAX_TOP) {
    mainPin.style.top = `${PinParam.MAX_TOP}px`;
  } else if (mainPin.offsetTop <= PinParam.MIN_TOP) {
    mainPin.style.top = `${PinParam.MIN_TOP}px`;
  }

  if (pinCords.left < 0) {
    mainPin.style.left = `${0 - window.utils.PIN_PARAM.WIDTH / 2}px`;
  } else if (pinCords.left > mapOverlay.offsetWidth) {
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
