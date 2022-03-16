const smallPics = document.getElementById('smallPics');
const bigPicImg = document.getElementById('bigPicImg');

smallPics.addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'IMG') {
    const rrc = event.target.src;
    bigPicImg.src = rrc;
  }
});
smallPics.addEventListener('mouseout', (event) => {
  if (event.target.tagName === 'IMG') {
    bigPicImg.src = '../image/2.png';
  }
});
