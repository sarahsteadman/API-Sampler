let latitude = 28.3772;
let longitude = -81.5707;
let history = JSON.parse(localStorage.getItem('history')) || [];

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

document.getElementById("history").addEventListener('click', displayHistory);

window.addEventListener('load', function () {
    document.body.style.background = 'black';
});
getLocation();