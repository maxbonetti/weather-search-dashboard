//get global variables from markup
//create events for city search
//allow user to see current weather forecast
// below display 5day weather forecast
//allow old cities searched below search bar for better user experience
//local storage for old cities searched
// local storage for forecasts 
//make sure display emoji based on weather
//EXTRA EXTRA EXTRA
// create light/dark mode button again
// old cities from local storage appear in new tab instead of take over main screen
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~GLOBAL VARIABLES~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const weatherFormEl = document.getElementById(`weahter-form`);
const oldSearchBtns = document.getElementById(`city-buttons`);
const cityInput = document.getElementById(`city-name`);
const cityDayContEl = document.getElementById(`city-day-container`);
const cityWeekContEl = document.getElementById(`city-week-container`);
const citySearchTerm = document.getElementById(`city-search-term`);
const apiUrlCurrent = `api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid={appid}`;
const apiUrlWeek = `api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid={appid}`;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~FUNCTIONS~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//function to reset the search bar and forms
// then we want to get city forecast by fetching from the API
// for both current and week
//get current forecast
// then get week forecast
//when we get and save to local storage
//then display current and weekly forecast
// when we display create new HTML elements
//then add event listeners and invoke functions
const formSubmitHandler = function (event) {
    event.preventDefault();
    const cityName = cityInput.ariaValueMax.trim();
    if (cityName) {
        getCityForecast(cityName);

        cityDayContEl.textContent = ``;
        cityWeekContEl.textContent= ``;
        cityInput.textContent= ``;
    } else {
        alert(`You must enter a city name.`)
    }
};
//GET current weather function from API
const getCurrentWeather = function (city) {
    fetch(apiUrlCurrent)
        .then(function (responseCurrent) {
            if(responseCurrent.ok) {
                console.log(responseCurrent);
                responseCurrent.json().then(function (dataCurrent) {
                    console.log(dataCurrent);
                    displayCurrentWeather(dataCurrent, city);
                });
            }else {
                alert(`Error: ${responseCurrent.statusText}`);
            }
        })
        .catch(function (error) {
            alert(`Unable to connect to OpenWeatherAPI`)
        });
};
//GET week of weather forecast function from API
const getWeeklyWeather = function (cityWeekly) {
    fetch(apiUrlWeek)
        .then(function (responseWeekly) {
            if(responseWeekly.ok) {
                console.log(responseWeekly);
                responseWeekly.json().then(function (dataWeekly) {
                    console.log(dataWeekly);
                    displayWeeklyWeather(dataWeekly, city);
                });
            }else {
                alert(`Error: ${responseWeekly.statusText}`);
            }
        })
        .catch(function (errorWeekly) {
            alert(`Unabale to connect to OpenWeatherAPI`)
        });
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//~~~~~INVOKES~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//  