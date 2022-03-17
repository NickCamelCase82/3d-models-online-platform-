const smallPics = document.getElementById('smallPics');
const bigPicImg = document.getElementById('bigPicImg');

smallPics.addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'IMG') {
    const rrc = event.target.src;
    bigPicImg.src = rrc;
  }
});
