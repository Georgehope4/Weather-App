window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDiscription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationZone = document.querySelector(".location-zone");
  let locationCountry = document.querySelector(".location-country")
  let iconElement = document.querySelector(".weather-icon");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;



      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ce04d2f609fac89858998e5ec715f687`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          //Set DOM Elements from the API
          temperatureDegree.textContent = data.main.temp;
          locationZone.textContent = data.name;
          locationCountry.textContent = data.sys.country;
          temperatureDiscription.textContent = data.weather[0].description;
          iconElement.innerHTML = `<img src="icons/${data.weather[0].icon}.png"/>`;

          //Formula to change Kelvin to Celcius
          let celsius = data.main.temp - 273;

          //Change temperature to Celcius/Kelvin
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = data.main.temp;
            }
          })



        });
    });


  }

});