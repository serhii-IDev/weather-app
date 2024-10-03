const apiKey = '0fec4cb5bafa4bb7cee3ff72723b3d32';
const weatherBlock = document.querySelector('#weather');
const nowDeg = document.querySelector('.degrees');
const wind = document.querySelector('#wind-speed');
const hum = document.querySelector('#hum');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const dateToDay = document.querySelector('#date-today');
const dayWeek = document.querySelector('#day-of-week');
const time = document.querySelector('#time');
const weatherIconBlock = document.querySelector('.block-info__icon');

//------country-----------------------------------------------------------------

import { countryNames, getCountryFullName } from "./js/country.js";

//--------icon-----------------------------------------------------------------

import { weatherIcons } from "./js/icons.js";

//---------theme--------------------------------------------------------

import { theme } from "./js/theme.js";
theme();

//--------swiper------------------------------------------------------

import { swiper } from "./js/swiper.js";

//--------------------------------------------------------------------------------

const inp = document.querySelector('.search-input');
const btnSearch = document.querySelector('.search-btn');
const placeBlock = document.querySelector('#place');
const place = document.querySelector('.search-place__place');

//--mob--

const inpMob = document.querySelector('.search-input-mob');
const btnSearchMob = document.querySelector('.search-btn-mob');
const placeBlockMob = document.querySelector('#place-mob');
const placeMob = document.querySelector('.search-place__place-mob');

let inpValue = '';
let where = 'Lutsk';

function apdateValue() {
  if (inpMob.classList.contains('__active')) {
    inpValue = inp.value;
  } else {
    inpValue = inpMob.value;
  }
  if (inpValue !== '') {
    where = inpValue;
    swiperWrapper.innerHTML = '';
    loadWeather()
    loadWeatherFiveDays()
  }
}

btnSearch.addEventListener('click', apdateValue);

btnSearch.addEventListener('click', () => {
  if (inp.value !== '' || inp.classList.contains('__active')) {
    inp.classList.toggle('__active');
    placeBlock.classList.toggle('__active');
    inp.value = '';
  }
});

//--mob--

btnSearchMob.addEventListener('click', apdateValue);

btnSearchMob.addEventListener('click', () => {
  if (inpMob.value !== '' || inpMob.classList.contains('__active')) {
    inpMob.classList.toggle('__active');
    placeBlockMob.classList.toggle('__active');
    inpMob.value = '';
    
  }
});


//-----------------------------------------------------------------------------

async function loadWeather(e) {
  if (!where) return;

  const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${where}&appid=${apiKey}`;
  const response = await fetch(server, {
    method: 'GET',
  });
  const responseResult = await response.json();

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

if (weatherBlock) {
  loadWeather()
}

function getWeather(data) {
  console.log(data);

  const location = data.name;
  const temp = Math.round(data.main.temp);
  const weatherIcon = data.weather[0].icon;
  const humPercent = Math.round(data.main.humidity);
  const windSpeed = Math.round(data.wind.speed);
  const sunSet = data.sys.sunset;
  const sunRise = data.sys.sunrise;
  const dt = data.dt;
  const country = data.sys.country;

  const weatherIconUrl = weatherIcons[weatherIcon] || 'src/img/icons/weather/default.png';

  placeMob.textContent = `${location}, ${getCountryFullName(country)}`;
  place.textContent = `${location}, ${getCountryFullName(country)}`;
  nowDeg.textContent = temp;
  wind.textContent = windSpeed + ' km/h';
  hum.textContent = humPercent + ' %';
  weatherIconBlock.innerHTML = `<img class='icon-weather' src="${weatherIconUrl}" alt="${data.weather[0].description}" />`

  function convertUnixTimestamp(e) {
    // Створюємо об'єкт дати, переводимо у мілісекунди
    const date = new Date(e * 1000);

    // Отримуємо локальний час
    const formattedTime = date.toLocaleTimeString(); // Формат часу

    // Повертаємо результат у вигляді часу

    return formattedTime;
  }

  const sunRiseResult = convertUnixTimestamp(sunRise);
  const sunSetResult = convertUnixTimestamp(sunSet);

  sunrise.textContent = sunRiseResult.slice(0, -3);
  sunset.textContent = sunSetResult.slice(0, -3);

  function convertUnixDatetamp(e) {
    // Створюємо об'єкт дати, переводимо у мілісекунди
    const date = new Date(e * 1000);

    // Отримуємо локальну дату
    const formattedDate = date.toLocaleDateString(); // Формат часу

    // Повертаємо результат у вигляді дати

    return formattedDate;
  }

  const today = convertUnixDatetamp(dt);
  let monthNumber = today.slice(3, 5);
  const firstLaterMonth = monthNumber.charAt(0);

  // час оновлення  

  function upDateTime(e) {
    const date = new Date(e * 1000);
    const formattedTime = date.toLocaleTimeString()

    return formattedTime;
  }

  const upTime = upDateTime(dt).slice(0, 5);
  time.textContent = upTime;


  if (firstLaterMonth === '0') {
    monthNumber = monthNumber.slice(1, 2);
  }

  function getMonthNumber(monthNumber) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return months[monthNumber - 1];
  }

  function getDayOfWeek(dateString) {

    const [day, month, year] = dateString.split('.');
    const date = new Date(year, month - 1, day);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayNumber = date.getDay();

    return daysOfWeek[dayNumber];
  }

  const dayOfWeek = getDayOfWeek(today);
  const day = today.slice(0, 2) + 'th';
  const month = getMonthNumber(monthNumber);
  const year = "‘" + today.slice(8, 10);

  dayWeek.textContent = dayOfWeek;
  dateToDay.textContent = `${day} ${month} ${year}`;


}

//------------Five-days--------------------------------------------------------------------------

const swiperWrapper = document.querySelector('.swiper-wrapper');

async function loadWeatherFiveDays(e) {
  if (!where) return;

  const server = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${where}&appid=${apiKey}`;
  const response = await fetch(server, {
    method: 'GET',
  });
  const responseResult = await response.json();

  if (response.ok) {
    getWeatherFiveDays(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }

}

function getWeatherFiveDays(data) {
  console.log(data);

  let index = 0;

  while (index < 35) {
    if(index == 32) {
      index += 7;
    } else {
      index += 8;
    }
    const day = (data.list[index].dt_txt).slice(0, 10);
    const degrees = Math.round(data.list[index].main.temp);
    const weatherIcon = data.list[index].weather[0].icon;
    const weatherIconUrl = weatherIcons[weatherIcon] || 'src/img/icons/weather/default.png';

    function getDayOfWeek(dateString) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const date = new Date(dateString);
      const dayOfWeek = date.getDay();

      return daysOfWeek[dayOfWeek];
    }

    const dayOfWeek = (getDayOfWeek(day)).slice(0, 3);
    const slide = `
        <div class="swiper-slide">
          <div class="slide">
            <div class="slide-degrees">
              ${degrees}
            </div>
            <div class="slide-icon">
              <img class="slide-icon__img" src="${weatherIconUrl}" alt="" ${data.list[index].weather[0].description}/>
            </div>
            <div class="slide-day">
              ${dayOfWeek}
            </div>
          </div>
        </div>                      
      `
    swiperWrapper.innerHTML += slide
    swiper.update();
  }

}

if(weatherBlock) {
  loadWeatherFiveDays()
}

