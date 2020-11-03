"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_PICTURE = `img/muffin-grey.svg`;

const userPictureInput = document.querySelector(`#avatar`);
const userPictureImage = document.querySelector(`.ad-form-header__preview img`);

const adPictureInput = document.querySelector(`#images`);
const adPictureImage = document.querySelector(`.ad-form__photo`);

const resetFileInputs = () => {
  userPictureImage.src = DEFAULT_PICTURE;
  adPictureImage.style.backgroundImage = ``;
};

const onChangePicture = (inputEl, cb) => {
  const file = inputEl.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.utils.isWordEndings(FILE_TYPES, fileName);

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

window.pictures = {
  resetFileInputs
};
