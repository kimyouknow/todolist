const todayWeather = document.querySelector(".js-weatherToday");
const hereLocation = todayWeather.querySelector(".js-weather-location"),
    hereDiscription = todayWeather.querySelector(".js-weather-summary"),
    hereTemperature = todayWeather.querySelector(".js-weather-tempNow"),
    hereTempHigh = todayWeather.querySelector(".js-weather-high"),
    hereTempLow = todayWeather.querySelector(".js-weather-low");

const COORDS = "coords";
const API_KEY = "a7feb8288051686aa7a4332851e0a2dc";

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return (response.json());
    }).then(function(json){
        const location = json.name;
        const temperature = json.main.temp;
        const tempHigh = json.main.temp_max;
        const tempLow = json.main.temp_min;
        const discription = json.weather[0]['description'];
        hereLocation.innerText = location;
        hereDiscription.innerText = discription;
        hereTemperature.innerText = temperature + '°C';
        hereTempHigh.innerText = '최고:' + tempHigh;
        hereTempLow.innerText = '최저:' + tempLow;

    });
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, 
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,  handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);  
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude); 
    }
}

function init() {
    loadCoords();
}
init();