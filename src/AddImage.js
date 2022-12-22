import villige from './assets/images/img02.png';

function AddImage() {
  const img = document.createElement('img');
  img.alt = 'villige',
  img.src = villige;

  const body = document.querySelector('body');
  body.appendChild(img);
}

export default AddImage;