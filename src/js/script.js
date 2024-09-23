const apiKey = '0fec4cb5bafa4bb7cee3ff72723b3d32';
const weatherBlock = document.querySelector('#weather');
const blockNowDeg = document.querySelector('.block-info__degrees');
const nowDeg = document.querySelector('.degrees');
const wind = document.querySelector('#wind-speed');
const hum = document.querySelector('#hum');
const rain = document.querySelector('#rain');
const sunrise = document.querySelector('#sunrise');
const goldenHour = document.querySelector('#golden-hour');
const sunset = document.querySelector('#sunset');
const dateToDay = document.querySelector('#date-today');
const dayWeek = document.querySelector('#day-of-week');
const time = document.querySelector('#time');
const weatherIconBlock = document.querySelector('.block-info__icon');

//------country-----------------------------------------------------------------

const countryNames = {
  'US': 'United States',
  'GB': 'United Kingdom',
  'CA': 'Canada',
  'FR': 'France',
  'DE': 'Germany',
  'IT': 'Italy',
  'UA': 'Ukraine',
  'JP': 'Japan',
  'CN': 'China',
};

function getCountryFullName(countryCode) {
  return countryNames[countryCode] || 'Unknown Country';
}

//--------icon-----------------------------------------------------------------

const weatherIcons = {
  '01d': 'src/img/icons/weather/sunny.png',  // Ясно вдень
  '01n': 'src/img/icons/weather/clear-night.png', // Ясно вночі
  '02d': 'src/img/icons/weather/partly-cloudy-day.png', // Мало хмар вдень
  '02n': 'src/img/icons/weather/partly-cloudy-night.png', // Мало хмар вночі
  '03d': 'src/img/icons/weather/cloudy-day.png', // Хмарно
  '03n': 'src/img/icons/weather/cloudy-night.png', // Хмарно
  '04d': 'src/img/icons/weather/overcast.png', // Дуже хмарно
  '04n': 'src/img/icons/weather/overcast.png', // Дуже хмарно
  '09d': 'src/img/icons/weather/showers.png', // Зливи
  '09n': 'src/img/icons/weather/showers.png', // Зливи
  '10d': 'src/img/icons/weather/rain.png', // Дощ вдень
  '10n': 'src/img/icons/weather/rain.png', // Дощ вночі
  '11d': 'src/img/icons/weather/thunderstorm.png', // Гроза
  '11n': 'src/img/icons/weather/thunderstorm.png', // Гроза
  '13d': 'src/img/icons/weather/snow.png', // Сніг
  '13n': 'src/img/icons/weather/snow.png', // Сніг
  '50d': 'src/img/icons/weather/mist.png', // Туман
  '50n': 'src/img/icons/weather/mist.png', // Туман

};

//------------------------------------------------------------------------

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

const slideDegrees = document.querySelector('.slide-degrees');
const slideIcon = document.querySelector('.slide-icon');
const slideDay = document.querySelector('.slide-day')
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



//-----------------------------------------------------------------

const btnTheme = document.querySelector('.theme');
const btnF = document.querySelector('.theme-btn__f');

function replacementСelsius(deg) {
  nowDeg.textContent = Math.round((+deg * 9 / 5) + 32);
}

function replacementFahrenheit(deg) {
  nowDeg.textContent = Math.round((+deg - 32) * 5 / 9);
}

if (btnTheme) {
  btnTheme.addEventListener('click', () => {
    blockNowDeg.classList.toggle('repl');
    btnF.classList.toggle('bg');
    if (btnF.classList.contains('bg')) {
      replacementСelsius(nowDeg.textContent);
    } else {
      replacementFahrenheit(nowDeg.textContent);
    }

  })
}

//--------------------------------------------------------------

let swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 54,
  speed: 500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween: 5,
    },
    320: {
      slidesPerView: 3,
      spaceBetween: 17,
    },
    400: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    430: {
      slidesPerView: 3,
      spaceBetween: 44,
    },
    525: {
      slidesPerView: 4,
      spaceBetween: 34,
    },
    720: {
      slidesPerView: 5,
      spaceBetween: 34,
    },
    996: {
      slidesPerView: 3,
      spaceBetween: 34,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 34,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 54,
    }

  },
});

//--------------------------------------------------------------------------------