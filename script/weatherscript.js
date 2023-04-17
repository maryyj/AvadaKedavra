drawWeather()

function drawWeather() {

  let city = prompt("Ange staden du befinner dig i", "Ange stad");
  let cityAnswer;
  if (city == null || city == "") 
  {
    cityAnswer = "Inget giltigt svar";
  } 
  else {

    const weather = document.getElementById('weather')
    const url = 'https://api.api-ninjas.com/v1/weather?city='

    const options = {
      method: 'GET',
      headers: {
        'X-Api-Key': 'lJtrYlId/KPR6Z5lPKQ3ig==1oyzIDROIwQeny0k',
        'Content-Type': 'application/json'
      }
    };

    fetch(url + city, options)
      .then(response => response.json())
      .then(result => {
        let temp = result.temp;
        let feelsLike = result.feels_like;
        let windSpeed = result.wind_speed;

        let card = document.createElement('div');
        card.setAttribute("class", "card");

        let tempElem = document.createElement('p');
        tempElem.innerHTML = "Temperatur i " + city + ": " + temp + " °C";
        tempElem.setAttribute("class", "temp");

        let feelsTempElem = document.createElement('p');
        feelsTempElem.innerHTML = "Känns som: " + feelsLike + " °C";
        feelsTempElem.setAttribute("class", "feelslike");
       
        let windSpeedElem = document.createElement('p');
        windSpeedElem.innerHTML = "Vind: " + windSpeed + " m/s";
        windSpeedElem.setAttribute("class", "windSpeed");

        // let hint = document.createElement('p')
        // hint.setAttribute("class", "hint")
        if (feelsLike > 15) {
          alert("Harry Potters tips:\nVarmt ute. Gå ut och spela eller spela senare.");
        }
        else if (feelsLike < 10) {
          alert("Harry Potters tips:\nSvalt ute.\nLycka till med spelandet!");
        }

        card.appendChild(tempElem)
        card.appendChild(feelsTempElem)
        card.appendChild(windSpeedElem)
        weather.appendChild(card)
      })
      .catch(error => console.error('Error:', error));
  }
}