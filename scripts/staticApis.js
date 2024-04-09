async function nasaAPI() {
    const URL = `https://api.nasa.gov/planetary/apod?api_key=nhuuTD4tckavpbHipAHceNkHqPsgpb2khhA5zcim`;
    const data = await apiFetch(URL);

    let htmlString = `<h3>${data.title}</h3>
    <img src="${data.url}" alt="${data.title}">
    <p>${data.explanation}</p>`

    display.innerHTML = htmlString;
    addToHistory("NASA", htmlString);
    renderDisplay("nasa");
};

async function quotesAPI() {
    const URL = `https://api.api-ninjas.com/v1/quotes?X-Api-Key=5SLPl7uNf3KphA2jSuksWQ==jzlctuLZxWSvPzKC`;
    const data = await apiFetch(URL);

    let htmlString = `<blockquote>
        <p>"${data[0].quote}" <footer>— ${data[0].author}</footer></p>
    </blockquote>`

    display.innerHTML = htmlString;

    addToHistory("quotes", htmlString);
    renderDisplay("quotes");
};

async function weatherAPI() {
    let requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=b500430b0da641eda0c3a8a5dea9ca0e`;

    const data = await apiFetch(requestURL);
    console.log(data);
    const iconId = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
    const location = data.name;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const min = data.main.temp_min;
    const max = data.main.temp_max;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    let htmlString = `        <div id="weather-div">
    <h3>Weather in ${location}</h3>
    <h4>${description.toUpperCase()}</h4>
            <img id="icon" src="${iconsrc}" alt="${description}">
            <p class="weather-info">Temperature: ${temperature}<small>F</small></p>
            <p class="weather-info">Feels Like: ${feelsLike}<small>F</small></p>
            <p class="weather-info">Max: ${max}F | Min: ${min}<small>F</small></p>
            <p class="weather-info">Pressure: ${pressure}<small>mb</small></p>
            <p class="weather-info">Humidity: ${humidity}<small>g/kg</small></p>
            <p class="weather-info">Wind Speed: ${windSpeed}<small>mph</small></p>
            </div>`

    display.innerHTML = htmlString;
    addToHistory("weather", htmlString);
    renderDisplay("weather");
};