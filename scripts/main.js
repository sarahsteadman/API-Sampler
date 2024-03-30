let latitude;
let longitude;

const display = document.getElementById("display");
const descriptionDiv = document.getElementById("api-description");
const menuBtn = document.getElementById("menu");

const weatherBtn = document.getElementById("weather");
const catsBtn = document.getElementById("cats");
const dogsBtn = document.getElementById("dogs");
const booksBtn = document.getElementById("books");
const quotesBtn = document.getElementById("quotes");
const triviaBtn = document.getElementById("trivia");
const mapsBtn = document.getElementById("maps");
const gifsBtn = document.getElementById("gifs");

menuBtn.addEventListener('click', () => {
    document.getElementById("cloak").classList.toggle('hidden');
    console.log(document.getElementById("cloak").classList);
});
weatherBtn.addEventListener('click', weatherAPI);
catsBtn.addEventListener('click', catsAPI);
dogsBtn.addEventListener('click', dogsAPI);
booksBtn.addEventListener('click', booksAPI);
// quotesBtn.addEventListener('click', quotesAPI);
// triviaBtn.addEventListener('click', triviaAPI);
// mapsBtn.addEventListener('click', mapsAPI);
// gifsBtn.addEventListener('click', gifsAPI);

async function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                resolve();
            }, (error) => {
                reject(error);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
}
async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return (data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
async function booksAPI() {
    setDescription("books");
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter search term';

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchButton.classList.add('small-btn');

    searchButton.addEventListener('click', async () => {
        console.log("called");
        let searchText = searchInput.value.trim();
        let requestURL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchText)}`;
        console.log(requestURL);

        const data = await apiFetch(requestURL);
        bookResults(data);
    });

    display.innerHTML = '';
    display.appendChild(searchInput);
    display.appendChild(searchButton);
}
function bookResults(data) {
    let bookList = document.createElement('div');
    console.log(data);
    console.log("second");

    for (let book of data.items) {
        console.log(book.volumeInfo);
        let htmlString = `<a href="${book.volumeInfo.previewLink}"><img src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="${book.volumeInfo.title}" class="cover"></a>
                          <p class="center">${book.volumeInfo.title}</p>
                          <p class="center">${book.volumeInfo.authors[0]}</p>
                          <p>${book.volumeInfo.description}</p>`

        bookList.innerHTML += htmlString;
    }
    display.appendChild(bookList);
}
async function weatherAPI() {
    setDescription("weather");
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
            <h4>${description}</h4>
            <img id="icon" src="${iconsrc}" alt="${description}">
            <p class="weather-info">Temperature: ${temperature}<small>F</small></p>
            <p class="weather-info">Feels Like: ${feelsLike}<small>F</small></p>
            <p class="weather-info">Max: ${max}F | Min: ${min}<small>F</small></p>
            <p class="weather-info">Pressure: ${pressure}<small>mb</small></p>
            <p class="weather-info">Humidity: ${humidity}<small>g/kg</small></p>
            <p class="weather-info">Wind Speed: ${windSpeed}<small>mph</small></p>
        </div>`

    display.innerHTML = htmlString;
}

async function catsAPI() {
    setDescription("cats");
    let requestUrl = "https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=live_zV2AscQLXlWRjR6VoTmv6g3HWec7093lAgYQlAJ0PwTMpots4vvdAQggXmo0Xx2o"
    const data = await apiFetch(requestUrl);
    console.log(data);
    const breedObj = data[0].breeds[0];

    let htmlString =
        ` <h3>${breedObj.name}</h3>
        <img src="${data[0].url}" alt="${breedObj.name}">
            <p>${breedObj.description}</p>`

    htmlString += makeTable(breedObj, 11).outerHTML;

    display.innerHTML = htmlString;
}
async function dogsAPI() {
    setDescription("dogs");
    let requestUrl = "https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1&api_key=live_tPqYGuz2PxgNrNSeDHjEDd4XibbSCJq2zKQRpC3YggcOvblq6ttK9uMILSBacJAf";
    const data = await apiFetch(requestUrl);
    console.log(data);
    const breedObj = data[0].breeds[0];

    let htmlString =
        ` <h3>${breedObj.name}</h3>
        <img src="${data[0].url}" alt="${breedObj.name}">`

    htmlString += makeTable(breedObj, 4).outerHTML;

    display.innerHTML = htmlString;
}
function makeTable(obj, skip = 0) {
    var table = document.createElement('table');
    let count = 0

    for (key in obj) {

        if (count < skip) {
            count++;
            continue;
        }

        var row = table.insertRow();
        var keyCell = row.insertCell(0);
        var valueCell = row.insertCell(1);

        keyCell.textContent = prettifyKey(key);
        valueCell.textContent = obj[key];
    }
    return table
}
function prettifyKey(key) {
    return key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
function setDescription(key) {
    const descriptions = {
        weather: `The OpenWeather API provides current weather data, hourly forecasts, and daily forecasts for locations worldwide. Developers can access a wide range of weather data, including temperature, humidity, wind speed, and precipitation, enabling them to create applications that offer weather updates and forecasts to users. With its extensive coverage and accurate data, the OpenWeather API is widely used in weather-related applications, such as weather forecasts, travel planners, and outdoor activity trackers. Learn more at  <a href="https://openweathermap.org/ap">https://openweathermap.org/api</a>`,
        cats: `The Cat API is a fun and playful API that provides access to a vast collection of cat images, and breed information. Developers can use the Cat API to retrieve random cat images, with or without the breed information attached. Whether it's creating a cat-themed game, building a cat adoption platform, or simply adding some feline flair to a website, the Cat API offers a purr-fect solution for cat enthusiasts. Learn more at <a href="https://thecatapi.com">https://thecatapi.com</a>`,
        dogs: `The Dog API is a comprehensive resource for all things dog-related. With the Dog API, developers can access a vast database of dog images, breeds, and breed information, making it easy to integrate dog-related content into their applications. Whether you're building a dog adoption platform, creating a virtual pet game, or simply looking to add some canine charm to your website, the Dog API provides the tools and resources you need. From retrieving random dog images to searching for specific breeds, the Dog API offers endless possibilities for dog lovers and developers alike. Learn more at <a href="https://www.thedogapi.com">https://www.thedogapi.com</a>`,
        books: `The Google Books API allows developers to access the vast collection of books and publications available in Google's library. With the Google Books API, developers can search for books by title, author, subject, or keyword, retrieve book details such as titles, authors, publication dates, and descriptions, and even access book previews and reviews. This API is invaluable for developers looking to integrate book-related features into their applications, such as book search engines, digital libraries, or book recommendation systems. Whether you're building a reading app, a book review website, or a platform for literary enthusiasts, the Google Books API provides a wealth of resources and functionalities to enhance your application. Learn more at <a href="https://developers.google.com/books">https://developers.google.com/books</a>`
    }
    descriptionDiv.classList.remove("hidden");
    const title = document.createElement("h3");
    title.innerText = key.toUpperCase();
    descriptionDiv.innerHTML = "";
    descriptionDiv.appendChild(title);
    descriptionDiv.innerHTML += descriptions[key];
}
getLocation();