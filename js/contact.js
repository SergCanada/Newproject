// --------currency start---------
let ratePractice = {}; 
//получили наши блоки
let elpUSD = document.querySelector('[data-value="USD"]');
let elpEUR = document.querySelector('[data-value="EUR"]');

// await  - хотим дождаться ответа сервера
getCoursePp();
async function getCoursePp(){
    let res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    let data = await res.json() //получаем наш обьект
    let result = await data;
    // console.log(result);
    // console.log(result.Valute.USD.Value);


    ratePractice.USD = result.Valute.USD;
    ratePractice.EUR = result.Valute.EUR;
    console.log(ratePractice)


    elpUSD.textContent = ratePractice.USD.Value.toFixed(4);
    elpEUR.textContent = ratePractice.EUR.Value.toFixed(4);
 
//USD
    if(ratePractice.USD.Value > ratePractice.USD.Previous){
        elpUSD.classList.add('red');
    }
    else{
        elpUSD.classList.add('green');
    }


//EUR
    if(ratePractice.EUR.Value > ratePractice.EUR.Previous){
        elpEUR.classList.add('red');
    }
    else{
        elpEUR.classList.add('green');
    }

}


// -------currency finish----------


// -------------clock start---------------
window.addEventListener("DOMContentLoaded",() => {
	const clock = new BouncyBlockClock(".clock");
});

class BouncyBlockClock {
	constructor(qs) {
		this.el = document.querySelector(qs);
		this.time = { a: [], b: [] };
		this.rollClass = "clock__block--bounce";
		this.digitsTimeout = null;
		this.rollTimeout = null;
		this.mod = 0 * 60 * 1000;

		this.loop();
	}
	animateDigits() {
		const groups = this.el.querySelectorAll("[data-time-group]");

		Array.from(groups).forEach((group,i) => {
			const { a, b } = this.time;

			if (a[i] !== b[i]) group.classList.add(this.rollClass);
		});

		clearTimeout(this.rollTimeout);
		this.rollTimeout = setTimeout(this.removeAnimations.bind(this),900);
	}
	displayTime() {
		// screen reader time
		const timeDigits = [...this.time.b];
		const ap = timeDigits.pop();

		this.el.ariaLabel = `${timeDigits.join(":")} ${ap}`;

		// displayed time
		Object.keys(this.time).forEach(letter => {
			const letterEls = this.el.querySelectorAll(`[data-time="${letter}"]`);

			Array.from(letterEls).forEach((el,i) => {
				el.textContent = this.time[letter][i];
			});
		});
	}
	loop() {
		this.updateTime();
		this.displayTime();
		this.animateDigits();
		this.tick();
	}
	removeAnimations() {
		const groups = this.el.querySelectorAll("[data-time-group]");
	
		Array.from(groups).forEach(group => {
			group.classList.remove(this.rollClass);
		});
	}
	tick() {
		clearTimeout(this.digitsTimeout);
		this.digitsTimeout = setTimeout(this.loop.bind(this),1e3);	
	}
	updateTime() {
		const rawDate = new Date();
		const date = new Date(Math.ceil(rawDate.getTime() / 1e3) * 1e3 + this.mod);
		let h = date.getHours();
		const m = date.getMinutes();
		const s = date.getSeconds();
		const ap = h < 12 ? "AM" : "PM";

		if (h === 0) h = 12;
		if (h > 12) h -= 12;

		this.time.a = [...this.time.b];
		this.time.b = [
			(h < 10 ? `0${h}` : `${h}`),
			(m < 10 ? `0${m}` : `${m}`),
			(s < 10 ? `0${s}` : `${s}`),
			ap
		];

		if (!this.time.a.length) this.time.a = [...this.time.b];
	}
}
// ----------clock finish --------------



// weather start 
const temp = document.getElementById("temp"),
  date = document.getElementById("date-time"),
  condition = document.getElementById("condition"),
  rain = document.getElementById("rain"),
  mainIcon = document.getElementById("icon"),
  currentLocation = document.getElementById("location"),
  uvIndex = document.querySelector(".uv-index"),
  uvText = document.querySelector(".uv-text"),

  windSpeed = document.querySelector(".wind-speed"),
  sunRise = document.querySelector(".sun-rise"),
  sunSet = document.querySelector(".sun-set"),
  humidity = document.querySelector(".humidity"),
  visibility = document.querySelector(".visibility"),

  humidityStatus = document.querySelector(".humidity-status"),
  airQuality = document.querySelector(".air-quality"),
  airQualityStatus = document.querySelector(".air-quality-status"),
  visibilityStatus = document.querySelector(".visibility-status"),

  weatherCards = document.querySelector("#weather-cards"),

  celciusBtn = document.querySelector(".celcius"),
  fahrenheitBtn = document.querySelector(".fahrenheit"),
  hourlyBtn = document.querySelector(".hourly"),
  weekBtn = document.querySelector(".week"),
  tempUnit = document.querySelectorAll(".temp-unit"),


  searchForm = document.querySelector("#search"),
  search = document.querySelector("#query");
  

let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "week";

// function to get date and time or Update Date and Time
function getDateTime() {
  let now = new Date(),
      hour = now.getHours(),
      minute = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  // 12 hours format
  hour = hour % 12;
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }  
  let dayString = days[now.getDay()];
  return `${dayString}, ${hour}:${minute}`;
}


//Updating date and time
date.innerText = getDateTime();


//update time every second
setInterval(() => {
  date.innerText = getDateTime();
}, 1000);


// function to get public ip address, with fetch
function getPublicIp() {
  fetch("https://geolocation-db.com/json/", {
    method: "GET",
    // headers: {},
  })
    .then((response) => response.json())
    .then((data) => {
      currentCity = data.city;
      getWeatherData(data.city, currentUnit, hourlyorWeek); 
//     })
//     .catch((err) => {
//       console.error(err);
    });
}
getPublicIp();


// function to get weather data
function getWeatherData(city, unit, hourlyorWeek) {
  const apiKey = "PX45SQY45YNL3DAJPTZ3AFEEH";
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
    {
      method: "GET",
      // headers: {},
    }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let today = data.currentConditions;
      if (unit === "c") {
        temp.innerText = today.temp;
      } else {
        console.log(celciusToFahrenheit(today.temp));
        temp.innerText = celciusToFahrenheit(today.temp);
      }
      currentLocation.innerText = data.resolvedAddress;
      condition.innerText = today.conditions;
      rain.innerText = "Perc - " + today.precip + "%";
      uvIndex.innerText = today.uvindex;
      windSpeed.innerText = today.windspeed;     
      humidity.innerText = today.humidity + "%";
      visibility.innerText = today.visibility;
      airQuality.innerText = today.winddir;

      measureUvIndex(today.uvindex);
      updateHumidityStatus(today.humidity); 
      updateVisibilityStatus(today.visibility);
      updateAirQualityStatus(today.winddir);      

      sunRise.innerText = convertTimeTo12HourFormat(today.sunrise);
      sunSet.innerText = convertTimeTo12HourFormat(today.sunset);

      mainIcon.src = getIcon(today.icon);
      changeBackground(today.icon);

      if (hourlyorWeek === "hourly") {
        updateForecast(data.days[0].hours, unit, "day");
      } else {
        updateForecast(data.days, unit, "week");
      }

    })
    .catch((err) => {
      // alert("City not found in our database");
    });
}


// function to conver celcius to fahrenheit
function celciusToFahrenheit(temp) {
  console.log(temp);
  return ((temp * 9) / 5 + 32).toFixed(1);
}


// function to get uv-index status
function measureUvIndex(uvIndex) {
  if (uvIndex <= 2) {
    uvText.innerText = "Low";
  } else if (uvIndex <= 5) {
    uvText.innerText = "Moderate";
  } else if (uvIndex <= 7) {
    uvText.innerText = "High";
  } else if (uvIndex <= 10) {
    uvText.innerText = "Very High";
  } else {
    uvText.innerText = "Extreme";
  }
}


// function to get humidity status
function updateHumidityStatus(humidity) { 
  if (humidity <= 30) {
    humidityStatus.innerText = "Low";
  } else if (humidity <= 60) {
    humidityStatus.innerText = "Moderate";
  } else {
    humidityStatus.innerText = "High";
  }
}


// function to get visibility status
function updateVisibilityStatus(visibility) {
  if (visibility <= 0.3) {
    visibilityStatus.innerText = "Dense Fog";
  } else if (visibility <= 0.16) {
    visibilityStatus.innerText = "Moderate Fog";
  } else if (visibility <= 0.35) {
    visibilityStatus.innerText = "Light Fog";
  } else if (visibility <= 1.13) {
    visibilityStatus.innerText = "Very Light Fog";
  } else if (visibility <= 2.16) {
    visibilityStatus.innerText = "Light Mist";
  } else if (visibility <= 5.4) {
    visibilityStatus.innerText = "Very Light Mist";
  } else if (visibility <= 10.8) {
    visibilityStatus.innerText = "Clear Air";
  } else {
    visibilityStatus.innerText = "Very Clear Air";
  }
}

// function to get air quality status 
function updateAirQualityStatus(airquality) {
  if (airquality <= 50) {
    airQualityStatus.innerText = "Good👌";
  } else if (airquality <= 100) {
    airQualityStatus.innerText = "Moderate😐";
  } else if (airquality <= 150) {
    airQualityStatus.innerText = "Unhealthy for Sensitive Groups😷";
  } else if (airquality <= 200) {
    airQualityStatus.innerText = "Unhealthy😷";
  } else if (airquality <= 250) {
    airQualityStatus.innerText = "Very Unhealthy😨";
  } else {
    airQualityStatus.innerText = "Hazardous😱";
  }
}


// convert time to 12 hour format 
function convertTimeTo12HourFormat(time) {
  let hour = time.split(":")[0];
  let minute = time.split(":")[1];
  let ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour 'zero' should be '12'
  hour = hour < 10 ? "0" + hour : hour; //add prefix zero if less then 10
  minute = minute < 10 ? "0" + minute : minute;
  let strTime = hour + ":" + minute + " " + ampm;
  return strTime;
}


// function to change weather icons
function getIcon(condition) {
  if (condition === "partly-cloudy-day") {
    return "img/partly-cloudy-day.png";
  } else if (condition === "partly-cloudy-night") {
    return "img/partly-cloudy-night.png";
  } else if (condition === "rain") {
    return "img/rain.png";
  } else if (condition === "clear-day") {
    return "img/sun.png";
  } else if (condition === "clear-night") {
    return "img/moon.png";
  } else {
    return "img/overcast_icon.png";
  }
}


// function to get day name from date
function getDayName(date) {
  let day = new Date(date);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day.getDay()];
}


//get hours from hh:mm:ss
function getHour(time) {
  let hour = time.split(":")[0];
  let min = time.split(":")[1];
  if (hour > 12) {
    hour = hour - 12;
    return `${hour}:${min} PM`;
  } else {
    return `${hour}:${min} AM`;
  }
}


//function to update Forecast
function updateForecast(data, unit, type) {
  weatherCards.innerHTML = "";
  let day = 0;
  let numCards = 0;

  //24 cards if hourly weather and 7 for weekly
  if (type === "day") {
    numCards = 24;
  } else {
    numCards = 7;
  }
  for (let i = 0; i < numCards; i++) {
    let card = document.createElement("div");
    card.classList.add("card");


    // hour if hourly time and day name if weekly    
    let dayName = getHour(data[day].datetime);
    if (type === "week") {
      dayName = getDayName(data[day].datetime);      
    }
    let dayTemp = data[day].temp;
    if (unit === "f") {
      dayTemp = celciusToFahrenheit(data[day].temp);
    }
    let iconCondition = data[day].icon;
    let iconSrc = getIcon(iconCondition);
    let tempUnit = "°C";
    if (unit === "f") {
      tempUnit = "°F";
    }
    card.innerHTML = `
            <h2 class="day-name">${dayName}</h2>
            <div class="card-icon">
              <img src="${iconSrc}" class="day-icon" alt="" />
            </div>
            <div class="day-temp">
              <h2 class="temp">${dayTemp}</h2>
              <span class="temp-unit">${tempUnit}</span>
            </div>
            `;
    weatherCards.appendChild(card);
    day++;
  }
}


// // function to change background depending on weather conditions
// function changeBackground(condition) {
//   const body = document.querySelector("body");
//   let bg = "";
//   if (condition === "partly-cloudy-day") {
//     bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
//   } else if (condition === "partly-cloudy-night") {
//     bg = "https://i.ibb.co/RDfPqXz/pcn.jpg";
//   } else if (condition === "rain") {
//     bg = "https://i.ibb.co/h2p6Yhd/rain.webp";
//   } else if (condition === "clear-day") {
//     bg = "https://i.ibb.co/WGry01m/cd.jpg";
//   } else if (condition === "clear-night") {
//     bg = "https://i.ibb.co/kqtZ1Gx/cn.jpg";
//   } else {
//     bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
//   }
//   body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${bg})`;
// }


fahrenheitBtn.addEventListener("click", () => {
  changeUnit("f");
});
celciusBtn.addEventListener("click", () => {
  changeUnit("c");
});


// function to change unit
function changeUnit(unit) {
  if (currentUnit !== unit) {
    currentUnit = unit;
    {
      //change unit on document
      tempUnit.forEach((elem) => {
      elem.innerText = `°${unit.toUpperCase()}`;
      });
      if (unit === "c") {
        celciusBtn.classList.add("active");
        fahrenheitBtn.classList.remove("active");
      } else {
        celciusBtn.classList.remove("active");
        fahrenheitBtn.classList.add("active");
      }
      //call get weather after change unit
      getWeatherData(currentCity, currentUnit, hourlyorWeek);
    }
  }
}


hourlyBtn.addEventListener("click", () => {
  changeTimeSpan("hourly");
});
weekBtn.addEventListener("click", () => {
  changeTimeSpan("week");
});


// function to change hourly to weekly or vice versa
function changeTimeSpan(unit) {
  if (hourlyorWeek !== unit) {
    hourlyorWeek = unit;
    if (unit === "hourly") {
      hourlyBtn.classList.add("active");
      weekBtn.classList.remove("active");
    } else {
      hourlyBtn.classList.remove("active");
      weekBtn.classList.add("active");
    }
    //update weather on time change
    getWeatherData(currentCity, currentUnit, hourlyorWeek);
  }
}


// function to handle search form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = search.value;
  if (location) {
    currentCity = location;
    getWeatherData(location, currentUnit, hourlyorWeek);
  }
});


//let create a cities array which we want to suggest or we can use any api for this
  cities = [
    "Toronto",
    "Ottawa",
    "Montreal",
    "India"
  ];

var currentFocus;
//adding eventlistner on search input
search.addEventListener("input", function (e) {
  removeSuggestions();
  var a,
      b,
      i,
      val = this.value;

      //if there is nothing search input do nothing
      if (!val) {
        return false;
      }
  currentFocus = -1;

  //creating a ul with a id suggestion    
  a = document.createElement("ul");
  a.setAttribute("id", "suggestions");

    //append the ul to its parent which is search form
  this.parentNode.appendChild(a);

  //adding li"s with matching search suggestion  
  for (i = 0; i < cities.length; i++) {
//     /*check if the items start with the same letters which are in input:*/
    if (
      cities[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
    ) {
//create a li element for each matching element (ij any suggestion matching then create li):
      b = document.createElement("li");

//make the matching letters bold, adding content in li:
//strong to make the matchin letters bold
      b.innerHTML =
        "<strong>" + cities[i].substr(0, val.length) + "</strong>";

//remaining part of suggestion
      b.innerHTML += cities[i].substr(val.length);

//insert a input field that will hold the current array item's value:
      b.innerHTML += "<input type='hidden' value='" + cities[i] + "'>";

//execute a function when someone clicks on the item value (DIV element):
//adding EventListener on suggestion
      b.addEventListener("click", function (e) {
//insert the value for the autocomplete text field:
//on click set the search input value with the click suggestion value
        search.value = this.getElementsByTagName("input")[0].value;
        removeSuggestions();
      });
//append suggestion li to ul
      a.appendChild(b);
    }
  }
});


function removeSuggestions() {
  //select the ul which is being adding on search input
  var x = document.getElementById("suggestions");
  //if x exists remove it
  if (x) x.parentNode.removeChild(x);
}


//lets add up and down keys function to select a suggestion
// /*execute a function presses a key on the keyboard:*/
//i
search.addEventListener("keydown", function (e) {
  var x = document.getElementById("suggestions");
  //select the li element of suggestion ul
  if (x) x = x.getElementsByTagName("li");

  if (e.keyCode == 40) {
//If the arrow DOWN key,is pressed,increase the currentFocus variable:
//If key code is DOWN button 
    currentFocus++;
//and and make the current item more visible:
//lets create a function to adda active suggsetion
    addActive(x);
  } else if (e.keyCode == 38) {

//If the arrow UP key, is pressed,decrease the currentFocus variable:
//If key code is UP button
    currentFocus--;
//and and make the current item more visible:
    addActive(x);
  }
  if (e.keyCode == 13) {
// If the ENTER key is pressed, prevent the form from being submitted,
//if enter is pressed add the curent select suggestion in input field
    e.preventDefault();
    if (currentFocus > -1) {
//and simulate a click on the "active" item:
      if (x) x[currentFocus].click();
    }
  }
});


function addActive(x) {
//a function to classify an item as "active":
//if there is no suggest return as it is

  if (!x) return false;
//start by removing the "active" class on all items:
  removeActive(x);
//if current focus is more than the length of suggestion array make it 0
  if (currentFocus >= x.length) currentFocus = 0;

//if its less than 0 make it last suggestion equals
  if (currentFocus < 0) currentFocus = x.length - 1;

//add class "autocomplete-active":
//adding active class on focused li
  x[currentFocus].classList.add("active");
}

//its working but we need to remove previusly actived suggestion
function removeActive(x) {
//   /*a function to remove the "active" class from all autocomplete items:*/
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }
}













// Cities add your own to get in search

// cities = [
//   {
//     country: "Canada",
//     name: "Toronto",
//     lat: "34.1463",
//     lng: "73.21168",
//   },

//   {
//     country: "Canada",
//     name: "Ottawa",
//     lat: "25.06717",
//     lng: "69.6434",
//   },
//   {
//     country: "Canada",
//     name: "Montreal",
//     lat: "31.4501",
//     lng: "73.70653",
//   },

// ];
// weather finish 