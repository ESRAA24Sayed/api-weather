let todayName=document.getElementById("today-name");
let todayDay=document.getElementById("today-day");
let todayMonth=document.getElementById("today-month");
let todayLocation=document.getElementById("today-location");
let todayTemp=document.getElementById("today-temp");
let todayCond=document.getElementById("today-cond");
let tomoroName=document.getElementsByClassName("tomoro-name");
let tomoroCond=document.getElementsByClassName("tomoro-cond");
let maxTemp=document.getElementsByClassName("max-temp");
let minTemp=document.getElementsByClassName("min-temp");
// let afterName=document.getElementById("after-name");
// let maxAfter=document.getElementById("max-after");
// let minAfter=document.getElementById("min-after");
// let afterCond=document.getElementById("after-cond");
let todayImg=document.getElementById("today-img");
let tomoroImg=document.getElementsByClassName("tomoro-img");
// let afterImg=document.getElementById("after-img");
let search=document.getElementById("search");
let humidity=document.getElementById("humidity");
let windK=document.getElementById("wind-k")
let windD=document.getElementById("wind-d")





// fetch data from api


 async function getWeatherData(country)
 {
   let weatherResponse= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f45523cca79f4d5fa67154642241301&q=${country}&days=7`);

   let finalResponse= await weatherResponse.json();

   return finalResponse
}




// display today data
function displayTodayData(data)
{
    let todayDate=new Date()
    todayName.innerHTML=todayDate.toLocaleDateString("en-us",{weekday:"long"})
    todayDay.innerHTML=todayDate.getDate();
    todayMonth.innerHTML=todayDate.toLocaleDateString("en-us",{month:"long"})
    todayLocation.innerHTML=data.location.name;
    todayTemp.innerHTML=data.current.temp_c;
    todayImg.setAttribute("src","https://"+data.current.condition.icon);
    todayCond.innerHTML=data.current.condition.text;
    humidity.innerHTML=data.current.humidity+"%";
    windK.innerHTML=data.current.wind_kph+"km/h";
    windD.innerHTML=data.current.wind_dir;
}

// display next days data
function tommorrowAfter(data){
    let forecast=data.forecast.forecastday;
    for(let i=0 ; i<2 ; i++)
    {
        let nextDate= new Date(forecast[i+1].date)
        tomoroName[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"})
        maxTemp[i].innerHTML=forecast[i+1].day.maxtemp_c;
        minTemp[i].innerHTML=forecast[i+1].day.mintemp_c;
        tomoroCond[i].innerHTML=forecast[i+1].day.condition.text;
        tomoroImg[i].setAttribute("src","https://"+forecast[i+1].day.condition.icon)

    }
}

// start application
async function startApp(countryName="cairo")
{
   let weatherData=await getWeatherData(countryName)
   if(!weatherData.error)
   {
    displayTodayData(weatherData);
    tommorrowAfter(weatherData)
   }
}
startApp()

search.addEventListener("input",function(){
    startApp(search.value)
})
document.addEventListener('DOMContentLoaded', function () {
    var focusableLinks = document.querySelectorAll('.focusable');

    focusableLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        // Remove 'focused' class from all links
        focusableLinks.forEach(function(l) {
          l.classList.remove('focused');
        });

        // Add 'focused' class to the clicked link
        link.classList.add('focused');
      });
    });
  });