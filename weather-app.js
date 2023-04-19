const currentLocationWeather = document.querySelector('div.weather-app__main__current-location-weather');
const APIKey = '125c4133df829f739ea47c7cc20dfd7c';
const hoianCoor = {lat: 15.87944, lon: 108.335};
let cityName = '';

const convertFtoC = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
};

const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
};

const msToKmh = (ms) => {
    return (ms * 3.6).toFixed(1);
};

document.querySelector('input.weather-app__main__search-form__city-name').addEventListener('change', (e) => {
    cityName = e.currentTarget.value;
});

document.querySelector('button.weather-app__main__search-form__submit').addEventListener('click', (e) => {
    e.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
        .then(response => {
            const weatherData = response.data;
            render(weatherData);
        })
        .catch((err) => console.log(err));
});

const render = (data) => {
    const container = document.querySelector('div.weather-app__main__current-location-weather');
    container.innerHTML = '';
    const currentLocation = document.createElement('h3');
    currentLocation.innerHTML = `${data.name}`;
    container.append(currentLocation);
    for([key, value] of Object.entries(data)){
        // console.log(key, value);
        switch(key) {
            case 'weather':
                const weather = document.createElement('p');
                weather.innerHTML = `${key}: ${value[0].main}, ${value[0].description}`;
                container.append(weather);
                break;
            case 'main':
                const tempurature = document.createElement('p');
                tempurature.innerHTML = `
                    Tempurature: ${convertKelvinToCelsius(value.temp)} degree<br>
                    Feels-like: ${convertKelvinToCelsius(value.feels_like)} degree<br>
                    Humidity: ${value.humidity}%
                `;
                container.append(tempurature);
                break;
            case 'clouds':
                const clouds = document.createElement('p');
                clouds.innerHTML = `
                    Cloudiess: ${value.all}%
                `;
                container.append(clouds);
                break;
            case 'wind':
                const wind = document.createElement('p');
                wind.innerHTML = `
                    Wind: ${value.speed} km/h
                `;
                container.append(wind);
                break;
        }
    }
};