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
    cityName.value = ""
  }
})


let count = 0
const updateDom = (data) => {
  
  if(count<4){
    let cardDiv = document.createElement("div")
    cardDiv.className = "col-lg-3 my-3 scale"
    cardDiv.innerHTML = `
    <div class="card mx-auto shadow" style="width: 18rem;">
      <div class="p-2 d-flex justify-content-between align-items-center cardTitle">
        <h4><span class="badge bg-danger">${data.sys.country}</span></h4>
        <i class="fa-regular fa-circle-xmark pb-2 text-danger" style="font-size:1.5rem"></i>
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
    `;
    document.querySelector(".row").prepend(cardDiv)
    count++
  }else{
    alert("You can not select more than 3 cities, please first delete some... ")
  }
};

window.addEventListener("load", () => {

  if(cityName.value == ""){
    cityName.value = "hatay"
    fetchWeatherData(cityName.value)
    cityName.value = ""
  }
})


const cardRow = document.querySelector(".row")

cardRow.addEventListener("click", (e) => {
  if(e.target.classList.contains("fa-circle-xmark")){
    e.target.parentElement.parentElement.parentElement.remove()
    count--
  }
})
