//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~GLOBAL VARIABLES~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const weatherFormEl = document.getElementById(`weather-form`);
const formInputEl = document.querySelector(`.form-input`);
const oldSearchBtns = document.getElementById(`city-buttons`);
const cityInput = document.getElementById(`city-name`);
const cityDayContEl = document.getElementById(`city-day-container`);
const cityWeekContEl = document.getElementById(`city-week-container`);
const citySearchTerm = document.getElementById(`city-search-term`);
const form = document.getElementById(`weatherForm`);
const input = document.querySelector(`input[type="search"]`);
const APIKey = "0b6d015b759c89351c44e08524c52f32";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// ~~~~~FUNCTIONS~~~~~//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const apiUrl = `api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;


// search info 
//GET current weather function from API
form.addEventListener(`submit`, function(event) {
    event.preventDefault();
    const cityName = input.value.trim();

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;
    fetch(apiUrl).then(response => {
        if(!response.ok){
            throw new Error('Failed to fetch weather data.');
        }
        return response.json();
    })
    .then(data => {
        displayCurrentWeather(data);
    })
    .catch(error => {
        console.error(`Unable to connect to OpenWeatherAPI: ${error.message}.`);
    });      
 
//GET week of weather forecast function from API
const apiUrlWeek = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=imperial`;
fetch(apiUrlWeek)
    .then(respone => {
        if(!respone.ok){
            throw new Error(`Network Response was not ok.`);
        }
        return respone.json();
    })
    .then(data => {
        displayWeeklyWeather(data);
    })
    .catch(error => {
        console.error(`There was a problem with the Fetch Request ${error.message}.`)
    });
});
//Function to save city to local storage

function saveCityToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('searchedCities', JSON.stringify(cities));
        displaySearchedCities(); // Update the list of searched cities on the UI
    }
}

//Display the  current weather forecast for city searched
function displayCurrentWeather(weatherData) {
    const cityName = weatherData.name;
    const temperature = weatherData.main.temp;
    const windSpeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;

    const currentWeatherInfo = `
        <h5 class="card-title">${cityName}</h5>
        <p class="card-text">
            <ul>
                <li>Temperature:${temperature}*F</li>
                <li>Humidity:${humidity}</li>
                <li>Wind Speeds:${windSpeed}</li>
            </ul>
        </p>
    `; 
    cityDayContEl.innerHTML = currentWeatherInfo;
    return currentWeatherInfo
    
};
//Display the weekly weather forecast for city searched
function displayWeeklyWeather(weeklyWeather) {
    const weeklyWeatherList = weeklyWeather.list;
    const weeklyWeatherForecast = weeklyWeatherList.filter((forecast, index) => index % 8 === 0);
    console.log(weeklyWeatherForecast);

    const weeklyCardsHtml = weeklyWeatherForecast.map(forecast => {
        const date = new Date(forecast.dt * 1000);
        const temperature = forecast.main.temp;
        const weatherDesc = forecast.weather[0].description;
    
    const weeklyWeatherInfo = `
    <h5 class="card-title">${date.toDateString()}</h5>
    <p class="card-text">
        <ul>
            <li>Temperature:${temperature}*F</li>
            <li>Weather:${weatherDesc}</li>
        </ul>
    </p>
`;
    return weeklyWeatherInfo
}).join('');
cityWeekContEl.innerHTML = weeklyCardsHtml;
}

//Function to display to local storage
function displaySearchedCities() {
    const cities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    const cityButtonsContainer = document.getElementById('city-buttons');``
    cityButtonsContainer.innerHTML = ''; // Clear previous buttons

    // Reverse the array to display the most recent search first
    cities.reverse().forEach(city => {
        const cityButton = document.createElement('button');
        cityButton.textContent = city;
        cityButton.classList.add('btn', 'btn-secondary', 'm-1');
        cityButton.onclick = function() {
            input.value = city;
            form.submit(); // Automatically search for this city again when clicked
        };
        cityButtonsContainer.appendChild(cityButton);
    });
}

// Call this function on page load to display the cities
document.addEventListener('DOMContentLoaded', displaySearchedCities);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// ~~~~~INVOKES~~~~~//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
document.getElementById('clearCities').addEventListener('click', function() {
    localStorage.removeItem('searchedCities');
    displaySearchedCities(); // Re-render the city buttons area (it will be empty now)
});  

