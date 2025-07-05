const apiKey = "a0f831b3e7953a5ace0a18419fd6d207";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getweather(city) {
    const response = await fetch(url + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").style.color = "#bcb8b1";
        document.querySelector(".weather").style.display = "none";
    } else {

        var data = await response.json()
        console.log(data)

        document.querySelector(".cityName").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity;
        document.querySelector(".wind").innerHTML = data.wind.speed + "kmph";
        document.querySelector(".feelslike").innerHTML = "FeelsLike "+Math.round(data.main.feels_like)+"°c";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "flex/cloudy.png";
        } else if (data.weather[0].main == "Clear" && data.main.temp >= 40) {
            weatherIcon.src = "flex/hot-temperature.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "flex/sun.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "flex/thunder.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "flex/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "flex/haze.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "flex/Snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        
    }

}

btn.addEventListener("click", () => {
    getweather(searchBox.value);
})

searchBox.addEventListener("keydown",()=>{
   if(event.key === "Enter"){
    getweather(searchBox.value);
   } 
})
