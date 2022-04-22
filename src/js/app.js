/* eslint  no-inner-declarations:0 */ // --> OFF
/* eslint  no-shadow:0 */ // --> OFF
/* eslint  func-names:0 */ // --> OFF

import validate from './validate';

const text = document.querySelector('.card-form-text');
const btn = document.querySelector('.btn');
const timelineForm = document.querySelector('.timeline-form');

const errWindow = document.querySelector('.error');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  const timeline = document.createElement('div');
  timeline.classList.add('timeline-info');

  const userInfo = document.createElement('div');
  userInfo.classList.add('users-info');

  timeline.insertAdjacentElement('afterbegin', userInfo);

  userInfo.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/2344/2344005.png"class="img">';

  const paragraph = document.createElement('p');
  userInfo.insertAdjacentElement('beforeend', paragraph);
  paragraph.classList.add('users-text');
  paragraph.textContent = text.value;

  const date = document.createElement('span');
  date.classList.add('date');

  let today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  today = `${day}-${month}-${year} в ${hours}:${minutes}`;

  if (minutes < 10) {
    // eslint-disable-next-line
    today = `${day}-${month}-${year} в ${hours}:` + `0${minutes}`;
  }

  if (hours < 10) {
    // eslint-disable-next-line
    today = `${day}-${month}-${year} в ` + `0${hours}` + `:${minutes}`;
  }

  date.textContent = today;

  if (navigator.geolocation) {
    function findPlace(position) {
      const location = document.createElement('span');
      location.classList.add('coords');
      location.textContent = `[${position.coords.latitude}, ${position.coords.longitude}]`;
      timeline.insertAdjacentElement('beforeend', location);
    }

    function error() {
      errWindow.style.display = 'block';

      const cancelBtn = document.querySelector('.cancel-btn');
      const confirmBtn = document.querySelector('.ok-btn');
      const coordinates = document.querySelector('#coordinates');

      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        errWindow.reset();
        errWindow.style.display = 'none';
      });

      confirmBtn.onclick = function (e) {
        e.preventDefault();

        if (validate(coordinates.value)) {
          const location = document.createElement('span');

          location.classList.add('coords');
          location.textContent = coordinates.value;
          timeline.insertAdjacentElement('beforeend', location);
          errWindow.reset();
          errWindow.style.display = 'none';
        } else {
          // eslint-disable-next-line
          alert('Некорректные значения!');
        }
      };
    }

    navigator.geolocation.getCurrentPosition(findPlace, error);
  }

  timelineForm.insertAdjacentElement('afterbegin', timeline);
  timeline.insertAdjacentElement('afterbegin', date);
});
