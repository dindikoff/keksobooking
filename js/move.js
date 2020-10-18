'use strict';
(function () {

  const doMove = (movedElement, cb) => {
    movedElement.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let dragged = false;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        dragged = true;

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        movedElement.style.top = (movedElement.offsetTop - shift.y) + `px`;
        movedElement.style.left = (movedElement.offsetLeft - shift.x) + `px`;

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

  window.move = {
    doMove
  };

})();
