const fetchWeatherData = async (cityName) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=605ed0a830c5efab159b66090cd503a6&units=metric`
  );
  const data = await res.json();
  if(data.cod == "404"){
    console.log(data.cod)
    alert("Please type correct...")
  }else{
    console.log(data)
    updateDom(data)
  }
};

const cityName = document.querySelector(".city-search")
const citySubmit = document.querySelector(".city-submit")

citySubmit.addEventListener("click", () => {
  if(cityName.value.trim() == ""){
    alert("Please enter a city...")
  }else{
    fetchWeatherData(cityName.value)
  }
})

const updateDom = (data) => {
  console.log(data)
  document.querySelector(".row").innerHTML += `
    <div class="col-3 my-3 scale">
    <div class="card mx-auto shadow" style="width: 18rem;">
      <div class="ms-auto me-3 mt-2">
        <h4><span class="badge bg-danger">${data.sys.country}</span></h4>
      </div>

            <div class="card-body">
            <h2 class="card-title text-center">${data.name.toUpperCase()}</h2>
           <div class="d-flex align-items-center justify-content-center">
                <p class="display-6 text-center text-danger">${Math.round(data.main.temp)}°C</p>
                <img class="mb-3 ms-3" src="${'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x'+'.png'}" >
           </div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex align-items-center "><b>Weather:&nbsp </b> ${data.weather[0].description.toUpperCase()} </li>
            <li class="list-group-item"><b>Wind Speed: </b> ${data.wind.speed} </li>
            <li class="list-group-item"><b>Humidity: </b> ${data.main.humidity}</li>
            <li class="list-group-item"><b>Temp Min-Max: </b> ${data.main.temp_min} - ${data.main.temp_max}</li>
            ${data.main.sea_level == undefined ? '' : `<li class="list-group-item"><b>Sea Level: </b> ${data.main.sea_level}</li>`}
        </ul>
    </div>
    </div>
    `;
};


