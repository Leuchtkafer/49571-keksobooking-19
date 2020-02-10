'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

var similarAdTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var getPictureNumber = function () {
  return '0' + Math.round(Math.random() * 7);
};

var getRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var getRandomNumber = function (array) {
  return Math.round(Math.random() * array.length);
};

var random = function random(min, max) {
  return min + Math.random() * (max - min);
};

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var ad = function () {
  return {
    author: {
      avatar: 'img/avatars/user' + getPictureNumber() + '.png'
    },
    offer: {
      title: 'Гостиница "Космос"',
      address: '600, 350',
      price: 1000,
      type: getRandomElement(types),
      rooms: getPictureNumber(),
      guests: getPictureNumber(),
      checkin: getRandomElement(checkins),
      checkout: getRandomElement(checkins),
      features: features.slice(getRandomNumber(features)),
      description: 'Описание гостиницы',
      photos: photos.slice(getRandomNumber(photos)),
    },

    location: {
      x: random(0, 700),
      y: random(130, 630),
    }
  };
};

var ads = [];

var createAdsArray = function (number) {
  for (var i = 0; i < number; i++) {
    ads.push(ad());
  }
};

createAdsArray(8);

var renderAd = function (advert) {
  var adElement = similarAdTemplate.cloneNode(true);

  adElement.style = 'left: ' + (advert.location.x - 25) + 'px; top: ' + (advert.location.y - 70) + 'px;';
  adElement.children[0].src = advert.author.avatar;
  adElement.children[0].alt = advert.offer.title;

  return adElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderAd(ads[i]));
}
mapPins.appendChild(fragment);

map.classList.remove('map--faded');
