const body = document.querySelector("body");

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

const getJSON = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if(xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
                resolve(data);
            } else {
                reject (Error(xhr.statusText));
            }
        };
        xhr.onerror = () => reject(Error('Error'));
        xhr.send();
    });
}

const toCelcius = (num) => {
    let F = (num * 9/5) + 32;
    return Math.round(F);
}

const weatherIcon = (data) => {
    if(data.indexOf("clear") !== -1){
        return '<i class="fa-solid fa-sun"></i>'
    } else if(data.indexOf("partly") !== -1){
        return '<i class="fa-solid fa-sun-cloud"></i>'
    } else if(data.indexOf("cloudy") !== -1){
        return '<i class="fa-solid fa-clouds"></i>'
    } else if(data.indexOf("fog") !== -1){
        return '<i class="fa-solid fa-cloud-fog"></i>'
    } else if(data.indexOf("thunder") !== -1){
        return '<i class="fa-solid fa-bolt-lightning"></i>'
    }else if(data.indexOf("heavy rain") !== -1){
        return '<i class="fa-solid fa-cloud-showers-heavy"></i>'
    }else if(data.indexOf("rain") !== -1){
        return '<i class="fa-solid fa-cloud-showers"></i>'
    } else if(data.indexOf("snow") !== -1){
        return '<i class="fa-solid fa-cloud-snow"></i>'
    } else {
        return "";
    }
}

const inputHTML = (data) => {
    body.insertAdjacentHTML('beforeend', `
        <div class="container">
            <h1>Free Code Camp Weather App</h1>
            <p>${weatherIcon(data.weather[0].main.toLowerCase())}</p>
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>${toCelcius(data.main.temp)}° F</p>
            <p>Feels like ${toCelcius(data.main.feels_like)}° F</p>
            <p>High of ${toCelcius(data.main.temp_max)}° F</p>
            <p>Low of ${toCelcius(data.main.temp_min)}° F</p>
            <p>${data.main.humidity}% Humidity</p>
            <p>${data.weather[0].main}, ${data.weather[0].description}</p>
            <p>By <a href="https://terrance-ford.herokuapp.com/" target="_blank">Terrance Ford</a></p>
        </div>
    `)
}

const showPosition = async (position) =>{
    let url = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
    getJSON(url).then((data)=>{
        //console.log(data);
        inputHTML(data);
    })
};

getLocation();