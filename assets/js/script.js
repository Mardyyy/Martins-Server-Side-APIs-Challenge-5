var APIKey = "9e1ca5beadec9f7a127203bad5e9f16a";

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
var forecastTextEl = document.querySelector('#forecast')
var cityBody = document.querySelector('#cityBody')

var citys = JSON.parse(localStorage.getItem("citys"))||[]

for (let index = 0; index < citys.length; index++) {
  const name = citys[index];

  var cityButton = document.createElement('button');
  cityButton.textContent = name
  cityBody.appendChild(cityButton);
  cityButton.addEventListener("click", searchApiHistory)

  // add if/else to stop duplication
  // no more than 5 buttons made
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;


  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  searchApi(searchInputVal);
}

function searchApi(city) {
 
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  citys.push(city)
  localStorage.setItem("citys", JSON.stringify(citys))

  queryURL = queryURL + '&q=' + city;

  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = locRes.city;

      console.log(locRes);
      
      printResults(locRes);

      var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
      
      fetch(weatherURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data)
      printForecast(data)
    })
    })
    
    
}

function searchApiHistory(event) {
  var city = event.target.textContent

  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
  citys.push(city)
  localStorage.setItem("citys", JSON.stringify(citys))

  queryURL = queryURL + '&q=' + city;

  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = locRes.city;
      
      printResults(locRes);

      var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
      
      fetch(weatherURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data)
      printForecast(data)
    })
    })
    
    
}

function printResults(resultObj) {
  console.log(resultObj);
  let unix_timestamp = resultObj.dt
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 

console.log(formattedTime);
console.log(date);

  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');


  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML = resultObj.name + '<br/>';
  bodyContentEl.innerHTML += '<strong>Date:</strong> ' + formattedTime + '<br/>';
    console.log(resultObj.dt)
  bodyContentEl.innerHTML +='<img src = " https://openweathermap.org/img/wn/'+ resultObj.weather[0].icon + '@2x.png"></img> '  + '<br/>';
    console.log(resultObj.weather.icon)
  bodyContentEl.innerHTML += '<strong>Temp:</strong> ' + resultObj.main.temp + '<br/>';
    console.log(resultObj.main.temp)
  bodyContentEl.innerHTML += '<strong>Wind:</strong> ' + resultObj.wind.speed + '<br/>';
    console.log(resultObj.wind.speed)
    bodyContentEl.innerHTML += '<strong>Humidity:</strong> ' + resultObj.main.humidity + '<br/>';
  

  resultBody.append(titleEl, bodyContentEl);
  resultContentEl.innerHTML = ""
  resultContentEl.append(resultCard);
}

function printForecast(data) {
  // add rest of data and style them
  forecastTextEl.innerHTML = `
    <div>${data.list[0].main.temp}</div>
    <div>${data.list[8].main.temp}</div>
    <div>${data.list[16].main.temp}</div>
    <div>${data.list[24].main.temp}</div>
    <div>${data.list[32].main.temp}</div>
  `

}


searchFormEl.addEventListener('submit', handleSearchFormSubmit);


