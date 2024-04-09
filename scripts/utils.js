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
            return data;
        } else {
            const errorMessage = await response.text();
            throw new Error(errorMessage); // Throw an error with the response text
        }
    } catch (error) {
        console.log(error); // Log any errors caught during the fetch process
        if (error.message.toLowerCase().includes("not found")) {
            window.alert("Keyword Not Found. Try again.");
        }
    }
}
function renderDisplay(description) {
    setDescription(description);
    display.classList.add("slideFromLeft");
    descriptionDiv.classList.add("slideFromRight");

    setTimeout(function () {
        display.classList.remove("slideFromLeft");
        descriptionDiv.classList.remove("slideFromRight");
    }, 401);
}
function setDescription(key) {
    const descriptions = {
        weather: `The OpenWeather API provides current weather data, hourly forecasts, and daily forecasts for locations worldwide. Developers can access a wide range of weather data, including temperature, humidity, wind speed, and precipitation, enabling them to create applications that offer weather updates and forecasts to users. With its extensive coverage and accurate data, the OpenWeather API is widely used in weather-related applications, such as weather forecasts, travel planners, and outdoor activity trackers. Learn more at  <a href="https://openweathermap.org/api">https://openweathermap.org/api</a>`,
        cats: `The Cat API is a fun and playful API that provides access to a vast collection of cat images, and breed information. Developers can use the Cat API to retrieve random cat images, with or without the breed information attached. Whether it's creating a cat-themed game, building a cat adoption platform, or simply adding some feline flair to a website, the Cat API offers a purr-fect solution for cat enthusiasts. Learn more at <a href="https://thecatapi.com">https://thecatapi.com</a>`,
        dogs: `The Dog API is a comprehensive resource for all things dog-related. With the Dog API, developers can access a vast database of dog images, breeds, and breed information, making it easy to integrate dog-related content into their applications. Whether you're building a dog adoption platform, creating a virtual pet game, or simply looking to add some canine charm to your website, the Dog API provides the tools and resources you need. From retrieving random dog images to searching for specific breeds, the Dog API offers endless possibilities for dog lovers and developers alike. Learn more at <a href="https://www.thedogapi.com">https://www.thedogapi.com</a>`,
        books: `The Google Books API allows access the vast collection of books and publications available in Google's library. With the Google Books API, developers can search for books by title, author, subject, or keyword, retrieve book details such as titles, authors, publication dates, and descriptions, and even access book previews and reviews. Whether you're building a reading app, a book review website, or a platform for literary enthusiasts, the Google Books API provides a wealth of resources and functionalities to enhance your application. Learn more at <a href="https://developers.google.com/books">https://developers.google.com/books</a>`,
        quotes: `API Ninja's quotes API allows programmers to access a collection of quotes for many different projects. With this API, developers can retrieve inspiring, motivational, or thought-provoking quotes to integrate into their applications. Programmers can fetch a random quote or specify parameters to filter quotes based on categories, authors, or tags. It's a valuable resource for those looking to enhance their applications with dynamic and engaging content sourced from a diverse range of quotations. Learn more at <a href="https://api-ninjas.com/api/quotes">https://api-ninjas.com/api/quotes</a>`,
        trivia: `The Open Trivia Database API offers a vast array of trivia questions to enhance your applications. Customize your API address by specifying the number of questions you require, ranging from a handful to a multitude. Additionally, you can refine your trivia selection by choosing from a diverse range of categories, ensuring that the content aligns with your audience's interests. Adjust the difficulty level to cater to different skill levels, from casual enthusiasts to seasoned trivia masters. Furthermore, you can select whether it be multiple choice, true/false, or any other format supported by the database. With these customizable options, the Open Trivia Database API allows you to seamlessly integrate engaging trivia content into your projects with ease. <a href="https://opentdb.com/api_config.php">https://opentdb.com/api_config.php</a>`,
        nasa: `The NASA API offers a wealth of space-related data and imagery for developers, researchers, and space enthusiasts alike. Providing a diverse range of endpoints, this API provides access to an extensive array of NASA's resources and datasets, spanning astronomical observations, satellite imagery, Mars rover data, and much more. Whether you're seeking the latest images captured by the Hubble Space Telescope, exploring the depths of our solar system with planetary data, or delving into historical space missions, the NASA API offers a multitude of endpoints to cater to your needs. Learn more at <a href="https://api.nasa.gov">https://api.nasa.gov</a>`,
        countries: `The Rest Countries API is a powerful tool for developers interested in accessing information about countries worldwide. With simple HTTP requests, developers can retrieve data such as country names, capitals, populations, currencies, languages, and more. This API provides a convenient way to access up-to-date and accurate information about countries, making it an invaluable resource for building applications related to geography, travel, demographics, and international data analysis. Learn more at <a href="https://restcountries.com/#api-endpoints-using-this-project">https://restcountries.com/#api-endpoints-using-this-project</a>`,
        history: `View previous api and search results by selecting them from the list.`,
    }
    descriptionDiv.classList.remove("hidden");
    const title = document.createElement("h3");
    title.innerText = key.toUpperCase();
    descriptionDiv.innerHTML = "";
    descriptionDiv.appendChild(title);
    descriptionDiv.innerHTML += descriptions[key];
}
function addToHistory(category, pastString) {
    let date = new Date();
    const format = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    let formattedDate = date.toLocaleString('en-US', format);

    history.push({ "category": category, "dateTime": formattedDate, "pastString": pastString });
    if (history.length > 30) {
        history.shift();
    }
    localStorage.setItem('history', JSON.stringify(history));
    console.log("added");
}

function displayHistory() {
    const title = document.createElement('h3');
    title.innerText = "Past Results";

    const list = document.createElement('ul');
    const reversedHistory = history.slice();
    reversedHistory.reverse();

    for (let i of reversedHistory) {
        const listItem = document.createElement('li');
        listItem.innerText = `${i.category.toUpperCase()} ${i.dateTime}`;

        listItem.addEventListener('click', () => {
            display.innerHTML = i.pastString;
            descriptionDiv.classList.add("hidden");
        });

        list.appendChild(listItem);
    }

    display.innerHTML = "";
    display.appendChild(title);
    display.appendChild(list);

    renderDisplay("history");
}