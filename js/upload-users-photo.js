const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFileElement = document.querySelector('.img-upload__input[type=file]');
const imgDefaultElement = document.querySelector('.img-upload__preview img');
const photoPreviewEffectsElement = document.querySelectorAll('.effects__preview');

const uploadUsersPhoto = () => {
  uploadFileElement.addEventListener('change', () => {
    const file = uploadFileElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const url = URL.createObjectURL(file);
      imgDefaultElement.src = url;
      photoPreviewEffectsElement.forEach(
        (it) => (it.style.backgroundImage = `url(${url})`));
    }
  });
};

export {uploadUsersPhoto};
