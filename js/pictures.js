'use strict';

const userPictureInput = document.querySelector(`#avatar`);
const userPictureImage = document.querySelector(`.ad-form-header__preview img`);

const adPictureInput = document.querySelector(`#images`);
const adPictureImage = document.querySelector(`.ad-form__photo`);

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const onChangePicture = (inputEl, cb) => {
  const file = inputEl.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.utils.endMatches(FILE_TYPES, fileName);

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      cb(reader);
    });

    reader.readAsDataURL(file);
  }
};

userPictureInput.addEventListener(`change`, () => {
  onChangePicture(userPictureInput, (reader) => {
    userPictureImage.src = reader.result;
  });
});

adPictureInput.addEventListener(`change`, () => {
  onChangePicture(adPictureInput, (reader) => {
    adPictureImage.style.backgroundImage = `url(${reader.result})`;
    adPictureImage.style.backgroundPosition = `center center`;
    adPictureImage.style.backgroundSize = `100%`;
  });
});
