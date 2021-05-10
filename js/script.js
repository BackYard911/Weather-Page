const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");


let forecasts = [];
let curr;
let currentLocation;



const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["Januray","February", "March","April","May","June","July","August","September","October","November","December"];
const dir = {
    N:"North",
    NNE:"North",
    NE:"North East",
    ENE:"East",
    E:"East",
    ESE:"East",
    SE:"South East",
    SSE:"South",
    S:"South",
    SSW:"South",
    SW:"South West",
    WSW:"West",
    W:"West",
    WNW:"West",
    NW:"North West",
    NNW:"North",


}


async function getData(locationKey="Cairo"){
    let data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8d6cbe267a2b4758bff143035212804&q=${locationKey}&days=3&aqi=no&alerts=no`);
    let response = await data.json();
    forecasts =  response.forecast.forecastday;
    curr = response.current;
    currentLocation = response.location.name;

    

}

async function loadData(key=undefined){
    await getData(key);
    displayData();
}






function displayData(){
    document.querySelector("#todaysTemp").innerHTML = `${Math.round(curr.temp_c)}`;
    let date = new Date(`${forecasts[0].date}`);
    document.querySelector("#currDay").innerHTML = days[date.getDay()];
    document.querySelector("#currDate").innerHTML = `${months[date.getMonth()]} ${date.getDate()}`
    document.querySelector("#currIco").src = `http:${curr.condition.icon}`;
    document.querySelector("#currText").innerHTML = curr.condition.text;
    document.querySelector("#currRainChance").innerHTML = `${forecasts[0].day.daily_chance_of_rain} %`;
    document.querySelector("#currWindSpeed").innerHTML = `${Math.round(curr.wind_kph)} km/h`;
    document.querySelector("#currWindDir").innerHTML = ` ${dir[curr.wind_dir]}`;
    document.querySelector("#currLocation").innerHTML = `${currentLocation}`;



    let tomsDate = new Date(`${forecasts[1].date}`);
    document.querySelector("#tomsMaxTemp").innerHTML= `${Math.round(forecasts[1].day.maxtemp_c)}`;
    document.querySelector("#tomsMinTemp").innerHTML= `${Math.round(forecasts[1].day.mintemp_c)}`;
    document.querySelector("#tomDay").innerHTML = days[tomsDate.getDay()];
    document.querySelector("#tomDate").innerHTML = `${months[tomsDate.getMonth()]} ${tomsDate.getDate()}`
    document.querySelector("#tomText").innerHTML = forecasts[1].day.condition.text;
    document.querySelector("#tomsIco").src = `http:${forecasts[1].day.condition.icon}`;



    let nextTomsDate = new Date(`${forecasts[2].date}`);
    document.querySelector("#nextTomsMaxTemp").innerHTML= `${Math.round(forecasts[2].day.maxtemp_c)}`;
    document.querySelector("#nextTomsMinTemp").innerHTML= `${Math.round(forecasts[2].day.mintemp_c)}`;
    document.querySelector("#nextTomDay").innerHTML = days[nextTomsDate.getDay()];
    document.querySelector("#nextTomDate").innerHTML = `${months[nextTomsDate.getMonth()]} ${nextTomsDate.getDate()}`
    document.querySelector("#nextTomText").innerHTML = forecasts[2].day.condition.text;
    document.querySelector("#nextTomsIco").src = `http:${forecasts[2].day.condition.icon}`;



}

loadData();

function getCityData(){
    let key = searchInput.value;
    loadData(`${key}`);

}


searchBtn.addEventListener("click",getCityData);