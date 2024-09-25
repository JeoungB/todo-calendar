import apikey from '../config/apikey.js';

const API_KEY = apikey;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=busan&appid=${API_KEY.apikey}&units=metric`;

const img = document.querySelector('#img');
const temp = document.querySelector('#temp');

async function getWeather() {
    try {
        await axios.get(BASE_URL)
        .then((result) => {
            const { main, weather } = result.data;
            const ICON_URL = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
            temp.innerHTML = `<p>${Math.round(main.temp)}</p><sup>℃</sup>`
            img.innerHTML = `<img src=${ICON_URL} alt='날씨 이미지 입니다.'></img>`
        })
    } catch (error) {
        console.log("날씨 정보 가져오기 실패", error);
    }
}

getWeather();