"use strict";

const TIMEOUT_IN_MS = 10000;
const Server = {
  GET_URL: `https://21.javascript.pages.academy/keksobooking/data`,
  POST_URL: `https://21.javascript.pages.academy/keksobooking`,
};

const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const createRequest = (type, URL, onSuccess, onError, data = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.open(`${type}`, URL);

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
        onError(
            `Серверная ошибка! Попробуйте позже. ${xhr.status} ${xhr.statusText}`
        );
        break;

      default:
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Ошибка! Проверьте Ваше соединение с интернетом!`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} + 'мс'`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.send(data);
};

const load = (onSuccess, onError) => {
  createRequest(`GET`, Server.GET_URL, onSuccess, onError);
};

const send = (data, onSuccess, onError) => {
  createRequest(`POST`, Server.POST_URL, onSuccess, onError, data);
};

window.backend = {
  load,
  send,
};
