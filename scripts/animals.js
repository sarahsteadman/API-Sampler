function catsAPI() {
    animalAPI("cats",
        "https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=live_zV2AscQLXlWRjR6VoTmv6g3HWec7093lAgYQlAJ0PwTMpots4vvdAQggXmo0Xx2o",
        11);
}
function dogsAPI() {
    animalAPI("dogs",
        "https://api.thedogapi.com/v1/images/search?limit=1&has_breeds=1&api_key=live_tPqYGuz2PxgNrNSeDHjEDd4XibbSCJq2zKQRpC3YggcOvblq6ttK9uMILSBacJAf",
        4);
}

async function animalAPI(animal, requestUrl, skips) {
    renderDisplay(animal);
    const data = await apiFetch(requestUrl);
    console.log(data);
    const breedObj = data[0].breeds[0];

    let htmlString =
        ` <h3>${breedObj.name}</h3>
        <img src="${data[0].url}" alt="${breedObj.name}">`

    if (animal == "cats") {
        htmlString += `<p>${breedObj.description}</p>`
    }

    htmlString += makeTable(breedObj, skips).outerHTML;

    display.innerHTML = htmlString;
    addToHistory(animal, htmlString);
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