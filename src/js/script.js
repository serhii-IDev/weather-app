
const apiKey = '0fec4cb5bafa4bb7cee3ff72723b3d32';
const weatherBlock = document.querySelector('#weather');
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

//------------------------------------------------------------------------

const inp = document.querySelector('.search-input');
const btnSearch = document.querySelector('.search-btn');
const placeBlock = document.querySelector('#place');
const place = document.querySelector('.search-place__place');
let where = 'Lutsk';


btnSearch.addEventListener('click', () => {
  
  where = document.querySelector('.search-place__place').textContent;
  console.log(where);
})








//-----------------------------------------------------------------------------

if (where != '') {
  async function loadWeather(e) {

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

  if(weatherBlock) {
    loadWeather()
  } 
} 


function getWeather(data) {
  console.log(data);

  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;
  const humPercent = Math.round(data.main.humidity);
  const windSpeed = Math.round(data.wind.speed);
  const sunSet = data.sys.sunset;
  const sunRise = data.sys.sunrise;
  const dt = data.dt;


  nowDeg.textContent = temp;
  wind.textContent = windSpeed + ' km/h';
  hum.textContent = humPercent + ' %';

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





//-----------------------------------------------------------------

const btnTheme = document.querySelector('.theme');
const btnF = document.querySelector('.theme-btn__f');

if (btnTheme) {
  btnTheme.addEventListener('click', () => {
    btnF.classList.toggle('bg');
  })
}


//--------------------------------------------------------------

new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 54,
  speed: 500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 54,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 54,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 54,
    },
    "@1.50": {
      slidesPerView: 4,
      spaceBetween: 54,
    }

  },
});

//--------------------------------------------------------------------------------