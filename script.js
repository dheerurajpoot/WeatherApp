let searchForm = document.querySelector('.w-search');
let cityInput = document.querySelector('.search');
let city = document.querySelector('.city');
let condition = document.querySelector('.weather-condition');
let temp = document.querySelector('#tempreture');
let img = document.querySelector('.w-img');
let wind_speed = document.querySelector('.wind');
let feelsLike = document.querySelector('#feels-like');
let humidity = document.querySelector('.humidity');
let visi = document.querySelector('.visibility');
let pressure = document.querySelector('.pressure');
let sunSet = document.querySelector('.sun-set');
let sunRise = document.querySelector('.sun-rise');
let dateTime = document.querySelector('.date');
let w_icon = document.querySelector('.w-img');

// get full name of country from country code 
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

// get date and time from api 
const getDateTime = (dt) => {
    const currDate = new Date(dt * 1000)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(currDate);
}

// get sunrise time from api
const getSunRise = (sunrise) => {
    const currTime = new Date(sunrise * 1000);
    const options = {
        hour: 'numeric',
        minute: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(currTime);
}

// get sun set time from api 
const getSunSet = (sunset) => {
    const currTime = new Date(sunset * 1000);
    const options = {
        hour: 'numeric',
        minute: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(currTime);
}

const weatherData = async (cityName) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1452fc0626e82ef2291c9c8082f5a84b`;
    try {
        const res = await fetch(URL);
        const data = await res.json();
        console.log(data);

        const { main, name, sys, wind, dt, weather, visibility } = data;

        city.textContent = `${name}, ${getCountryName(sys.country)}`

        let ctemp = Math.round(main.temp - 273.15);
        temp.textContent = ctemp;
        condition.textContent = weather[0].description;
        humidity.textContent = `${main.humidity} %`;
        pressure.textContent = `${main.pressure} hPa`;
        wind_speed.innerHTML = `${wind.speed} km/h`;

        visi.innerHTML = `${visibility / 1000} km`;

        let ftemp = Math.round(main.feels_like - 273.15);
        feelsLike.innerHTML = ` ${ftemp}&deg;C`;
        dateTime.innerHTML = getDateTime(dt);
        sunRise.textContent = getSunRise(sys.sunrise);
        sunSet.textContent = getSunSet(sys.sunset);
        w_icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    } catch (error) {
        alert("Wrong city Name");
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherData(cityInput.value);
    cityInput.value = ""; 
});

weatherData("kanpur");