'use strict';

const Server = {
  GET_URL: `https://21.javascript.pages.academy/keksobooking/data`,
  POST_URL: `https://21.javascript.pages.academy/keksobooking`
};

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const load = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.open(`GET`, Server.GET_URL);

  xhr.addEventListener(`load`, () => {
    switch (xhr.status) {
      case StatusCode.OK:
        onSuccess(xhr.response);
        break;
      case StatusCode.BAD_REQUEST:
        onError(`Ошибка в запросе! ${xhr.status} ${xhr.statusText}`);
        break;
      case StatusCode.NOT_FOUND:
        onError(`Страница не найдена! ${xhr.status} ${xhr.statusText}`);
        break;
      case StatusCode.SERVER_ERROR:
        onError(`Серверная ошибка! Попробуйте позже. ${xhr.status} ${xhr.statusText}`);
        break;

      default:
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Ошибка! Проверьте Ваше соединение с интернетом!`);
  });

  xhr.send();
};

const send = (data, onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    switch (xhr.status) {
      case StatusCode.OK:
        onLoad(xhr.response);
        break;
      case StatusCode.BAD_REQUEST:
        onError(`Ошибка в запросе! ${xhr.status} ${xhr.statusText}`);
        break;
      case StatusCode.NOT_FOUND:
        onError(`Страница не найдена! ${xhr.status} ${xhr.statusText}`);
        break;
      case StatusCode.SERVER_ERROR:
        onError(`Серверная ошибка! Попробуйте позже. ${xhr.status} ${xhr.statusText}`);
        break;

      default:
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.open(`POST`, Server.POST_URL);
  xhr.send(data);
};

window.backend = {
  load,
  send
};
