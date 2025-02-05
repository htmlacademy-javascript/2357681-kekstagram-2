const VISIBLE_COMMENTS = 5;

const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

let shownComments = 0;
let comments = [];

commentsList.innerHTML = '';

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(shownComments, shownComments + VISIBLE_COMMENTS);
  const renderedCommentsLength = renderedComments.length + shownComments;

  renderedComments.forEach ((comment) => {
    const pictureComment = commentTemplate.cloneNode(true);

    pictureComment.querySelector('.social__picture').src = comment.avatar;
    pictureComment.querySelector('.social__picture').alt = comment.name;
    pictureComment.querySelector('.social__text').textContent = comment.message;

    commentsFragment.appendChild(pictureComment);
  });

  commentsList.appendChild(commentsFragment);

  commentCount.firstChild.textContent = `${renderedCommentsLength} `;
  document.querySelector('.social__comment-total-count').textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }

  shownComments += VISIBLE_COMMENTS;
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();

  commentsLoader.addEventListener('click', renderNextComments);
};

const clearComments = () => {
  shownComments = 0;
  commentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
};

export {clearComments, renderComments};
