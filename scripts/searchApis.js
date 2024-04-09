
function booksAPI() {


    function bookResults(data) {
        console.log(data);
        let dataDiv = document.getElementById("dataDiv");
        dataDiv.innerHTML = "";
        let htmlString = "";
        if (!data.items) {
            window.alert("No books found by that keyword. Try again.");
            return;
        }
        for (let book of data.items) {
            htmlString += `<a href="${book.volumeInfo.previewLink ? book.volumeInfo.previewLink : '#'}"><img src="${book.volumeInfo.imageLinks?.smallThumbnail ? book.volumeInfo.imageLinks.smallThumbnail : 'placeholder.jpg'}" alt="${book.volumeInfo.title}" class="cover"></a>
                            <p class="center">${book.volumeInfo.title ? book.volumeInfo.title : 'Unknown Title'}</p>
                            <p class="center">${book.volumeInfo.authors?.[0] ? book.volumeInfo.authors[0] : 'Unknown Author'}</p>
                            <p>${book.volumeInfo.description ? book.volumeInfo.description : 'Description not available'}</p>`;


        }
        dataDiv.innerHTML = htmlString;
        addToHistory("Books", htmlString);
    }

    searchAPIs("Book", "https://www.googleapis.com/books/v1/volumes?q=", bookResults);

    renderDisplay('books');
}
function countriesAPI() {

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
        addToHistory("Countries", htmlString);
    }

    searchAPIs("Country", "https://restcountries.com/v3.1/name/", countryResults);
    renderDisplay("countries");
}
async function searchAPIs(apiName, url, apiFunction) {
    const searchTitle = document.createElement('h3');
    searchTitle.innerText = `${apiName} Search`

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Enter search term';
    searchInput.addEventListener('focus', () => {
        searchInput.classList.add('focus');
    });
    searchInput.addEventListener('blur', () => {
        searchInput.classList.remove('focus');
    });

    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchButton.classList.add('small-btn');

    let dataDiv = document.createElement('div');
    dataDiv.setAttribute('id', 'dataDiv');

    searchButton.addEventListener('click', async () => {
        let searchText = searchInput.value.trim();
        let requestURL = url + encodeURIComponent(searchText);

        const data = await apiFetch(requestURL);

        apiFunction(data);
    });

    display.innerHTML = '';
    display.appendChild(searchTitle);
    display.appendChild(searchInput);
    display.appendChild(searchButton);
    display.appendChild(dataDiv);
}