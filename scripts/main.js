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
const nasaBtn = document.getElementById("nasa");
const countryBtn = document.getElementById("country");

menuBtn.addEventListener('click', () => {
    document.getElementById("cloak").classList.toggle('hidden');
    console.log(document.getElementById("cloak").classList);
});
booksBtn.addEventListener('click', booksAPI);
catsBtn.addEventListener('click', catsAPI);
dogsBtn.addEventListener('click', dogsAPI);
countryBtn.addEventListener('click', countriesAPI);
nasaBtn.addEventListener('click', nasaAPI);
quotesBtn.addEventListener('click', quotesAPI);
triviaBtn.addEventListener('click', triviaAPI);
weatherBtn.addEventListener('click', weatherAPI);

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
async function searchAPIs(apiName, url, apiFunction) {
    const searchTitle = document.createElement('h3');
    searchTitle.innerText = `${apiName} Search`

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter search term';

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchButton.classList.add('small-btn');

    let dataDiv = document.createElement('div');
    dataDiv.setAttribute('id', 'dataDiv');

    searchButton.addEventListener('click', async () => {
        console.log("called");
        let searchText = searchInput.value.trim();
        let requestURL = url + encodeURIComponent(searchText);
        console.log(requestURL);

        const data = await apiFetch(requestURL);

        apiFunction(data);
    });

    display.innerHTML = '';
    display.appendChild(searchTitle);
    display.appendChild(searchInput);
    display.appendChild(searchButton);
    display.appendChild(dataDiv);
}
function booksAPI() {
    setDescription('books');

    function bookResults(data) {
        console.log(data);
        console.log("second");
        let dataDiv = document.getElementById("dataDiv");
        dataDiv.innerHTML = "";

        for (let book of data.items) {
            console.log(book.volumeInfo);
            let htmlString = `<a href="${book.volumeInfo.previewLink}"><img src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="${book.volumeInfo.title}" class="cover"></a>
            <p class="center">${book.volumeInfo.title}</p>
            <p class="center">${book.volumeInfo.authors[0]}</p>
            <p>${book.volumeInfo.description}</p>`

            dataDiv.innerHTML += htmlString;
        }
    }

    searchAPIs("Book", "https://www.googleapis.com/books/v1/volumes?q=", bookResults);
}
function countriesAPI() {
    setDescription("countries");

    function countryResults(data) {
        const info = data[0];
        const nameKey = Object.keys(info.name.nativeName)[0];
        const localName = info.name.nativeName[nameKey].common;
        let languages = "";

        for (let key in info.languages) {
            languages += info.languages[key] + " ";
        }


        let htmlString = `<h3>${info.name.common}</h3>
        <h4 class="center">${localName}</h4>
        <p class="center">National Flag</p>
        <img src="${info.flags.png}" alt="${info.name.common} flag" class="flag">
                <p class="center">Coat of Arms</p>
        <img src="${info.coatOfArms.png}" alt="${info.name.common} coat of arms" class="flag">
                          <p class="center">Region: ${info.region}</p>
                          <p class="center">Capital: ${info.capital}</p>
                          <p class="center">Languages: ${languages}</p>`

        document.getElementById('dataDiv').innerHTML = htmlString;
    }

    searchAPIs("Country", "https://restcountries.com/v3.1/name/", countryResults);
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
async function nasaAPI() {
    setDescription("nasa");
    "https://api.nasa.gov/insight_weather/?api_key=nhuuTD4tckavpbHipAHceNkHqPsgpb2khhA5zcim&feedtype=json&ver=1.0"
    const URL = `https://api.nasa.gov/planetary/apod?api_key=nhuuTD4tckavpbHipAHceNkHqPsgpb2khhA5zcim`;
    const data = await apiFetch(URL);

    display.innerHTML = `<h3>${data.title}</h3>
    <img src="${data.url}" alt="${data.title}">
    <p>${data.explanation}</p>`
};
async function quotesAPI() {
    setDescription("quotes");
    display.innerHTML = `<h3>Picture Quote</h3> <img src="https://zenquotes.io/api/image">`;

}
async function triviaAPI() {
    setDescription("trivia");

    const data = await apiFetch("https://opentdb.com/api.php?amount=1&category=20&difficulty=easy&type=multiple");
    let questionObj = data.results[0];
    let mixed_answers = questionObj.incorrect_answers;
    mixed_answers.push(questionObj.correct_answer);
    questionObj["mixed_answers"] = shuffleArray(mixed_answers);

    const correct_count = parseInt(localStorage.getItem("correct_count")) || 0;
    const total = parseInt(localStorage.getItem("total")) || 0;

    let htmlString = `
    <p id="score">Correct Answers: ${correct_count}/${total}</p>
    <div id="question1">
        <p>Question 1: ${questionObj.question}</p>
        <input type="radio" name="q1" value="${questionObj.mixed_answers[0]}"> ${questionObj.mixed_answers[0]}<br>
        <input type="radio" name="q1" value="${questionObj.mixed_answers[1]}"> ${questionObj.mixed_answers[1]}<br>
        <input type="radio" name="q1" value="${questionObj.mixed_answers[2]}"> ${questionObj.mixed_answers[2]}<br>
        <input type="radio" name="q1" value="${questionObj.mixed_answers[3]}"> ${questionObj.mixed_answers[3]}<br>
        </div>
        <p id="answer1" class="hidden">Correct answer: ${questionObj.correct_answer}<br> Your answer: <span id="userAnswer"></span></p>
        <button id="submitBtn" class="small-btn">Submit</button>
        <button id="newQuestionBtn" class="small-btn">New Question</button>`;

    display.innerHTML = htmlString;

    document.getElementById("newQuestionBtn").addEventListener('click', triviaAPI);
    document.getElementById("submitBtn").addEventListener('click', () => {
        const answers = document.getElementsByName("q1");
        console.log(answers);
        for (a of answers) {
            if (a.checked) {
                let correct;
                answerSubmitted(a.value);
                localStorage.setItem('total', total + 1);
                if (a.value == questionObj.correct_answer) {
                    console.log("correct");
                    document.getElementById("score").innerHTML = `${correct_count + 1} / ${total + 1}`;
                    localStorage.setItem('correct_count', correct_count + 1);
                }
                else {
                    document.getElementById("score").innerHTML = `${correct_count} / ${total + 1}`;
                }
                return;
            }
        }
        localStorage.setItem('total', total + 1);
        answerSubmitted();
    });
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
}
function answerSubmitted(answer = "No answer selected") {
    document.getElementById("userAnswer").innerText = answer;
    document.getElementById("question1").classList.add("hidden");
    document.getElementById("submitBtn").classList.add("hidden");
    document.getElementById("answer1").classList.remove("hidden");
}
function makeTable(obj, skip = 0) {
    var table = document.createElement('table');
    let count = 0

    for (key in obj) {

        if (count < skip || key == "reference_image_id") {
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
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function setDescription(key) {
    const descriptions = {
        weather: `The OpenWeather API provides current weather data, hourly forecasts, and daily forecasts for locations worldwide. Developers can access a wide range of weather data, including temperature, humidity, wind speed, and precipitation, enabling them to create applications that offer weather updates and forecasts to users. With its extensive coverage and accurate data, the OpenWeather API is widely used in weather-related applications, such as weather forecasts, travel planners, and outdoor activity trackers. Learn more at  <a href="https://openweathermap.org/api">https://openweathermap.org/api</a>`,
        cats: `The Cat API is a fun and playful API that provides access to a vast collection of cat images, and breed information. Developers can use the Cat API to retrieve random cat images, with or without the breed information attached. Whether it's creating a cat-themed game, building a cat adoption platform, or simply adding some feline flair to a website, the Cat API offers a purr-fect solution for cat enthusiasts. Learn more at <a href="https://thecatapi.com">https://thecatapi.com</a>`,
        dogs: `The Dog API is a comprehensive resource for all things dog-related. With the Dog API, developers can access a vast database of dog images, breeds, and breed information, making it easy to integrate dog-related content into their applications. Whether you're building a dog adoption platform, creating a virtual pet game, or simply looking to add some canine charm to your website, the Dog API provides the tools and resources you need. From retrieving random dog images to searching for specific breeds, the Dog API offers endless possibilities for dog lovers and developers alike. Learn more at <a href="https://www.thedogapi.com">https://www.thedogapi.com</a>`,
        books: `The Google Books API allows developers to access the vast collection of books and publications available in Google's library. With the Google Books API, developers can search for books by title, author, subject, or keyword, retrieve book details such as titles, authors, publication dates, and descriptions, and even access book previews and reviews. This API is invaluable for developers looking to integrate book-related features into their applications, such as book search engines, digital libraries, or book recommendation systems. Whether you're building a reading app, a book review website, or a platform for literary enthusiasts, the Google Books API provides a wealth of resources and functionalities to enhance your application. Learn more at <a href="https://developers.google.com/books">https://developers.google.com/books</a>`,
        quotes: `The ZenQuotes API offers a serene collection of inspirational quotes to uplift and motivate users. With a variety of endpoints, including generating random quotes, retrieving the quote of the day, and fetching picture quotes the ZenQuotes API provides ample opportunities for developers to integrate wisdom and inspiration into their applications. Whether developers are seeking to enrich their applications with timeless words of wisdom or enhance user experience with captivating visuals, the ZenQuotes API provides a tranquil sanctuary of inspiration. Learn more at <a href="https://zenquotes.io">https://zenquotes.io</a>`,
        trivia: `The Open Trivia Database API offers a vast array of trivia questions to enhance your applications or websites. You have the flexibility to tailor your API requests to suit your specific needs. Customize your API address by specifying the number of questions you require, ranging from a handful to a multitude. Additionally, you can refine your trivia selection by choosing from a diverse range of categories, ensuring that the content aligns with your audience's interests. Adjust the difficulty level to cater to different skill levels, from casual enthusiasts to seasoned trivia masters. Furthermore, you can select the type of questions you prefer, whether it be multiple choice, true/false, or any other format supported by the database. With these customizable options, the Open Trivia Database API empowers you to seamlessly integrate engaging trivia content into your projects with ease. <a href="https://opentdb.com/api_config.php">https://opentdb.com/api_config.php</a>`,
        nasa: `The NASA API offers a wealth of space-related data and imagery for developers, researchers, and space enthusiasts alike. Providing a diverse range of endpoints, this API provides access to an extensive array of NASA's resources and datasets, spanning astronomical observations, satellite imagery, Mars rover data, and much more. Whether you're seeking the latest images captured by the Hubble Space Telescope, exploring the depths of our solar system with planetary data, or delving into historical space missions, the NASA API offers a multitude of endpoints to cater to your needs. Learn more at <a href="https://api.nasa.gov">https://api.nasa.gov</a>`,
        countries: `The Rest Countries API is a powerful tool for developers interested in accessing detailed information about countries worldwide. With simple HTTP requests, developers can retrieve data such as country names, capitals, populations, currencies, languages, and more. This API provides a convenient way to access up-to-date and accurate information about countries, making it an invaluable resource for developers building applications related to geography, travel, demographics, and international data analysis. Whether you're creating a website, mobile app, or desktop application, the Rest Countries API offers a user-friendly interface and comprehensive documentation to help you integrate country-related data seamlessly into your projects. Learn more at <a href="https://restcountries.com/#api-endpoints-using-this-project">https://restcountries.com/#api-endpoints-using-this-project</a>`
    }
    descriptionDiv.classList.remove("hidden");
    const title = document.createElement("h3");
    title.innerText = key.toUpperCase();
    descriptionDiv.innerHTML = "";
    descriptionDiv.appendChild(title);
    descriptionDiv.innerHTML += descriptions[key];
}
getLocation();