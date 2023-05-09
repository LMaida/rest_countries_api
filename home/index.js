const pageMode = document.querySelector(".page-mode");
const pageContainer = document.querySelector(".container");
const header = document.querySelector(".header");
const pageContent = document.querySelector(".page-content")
const input = document.querySelector(".input");
const countriesDisplay = document.querySelector(".countries");
const selectRegion = document.querySelector(".regions");

document.addEventListener("DOMContentLoaded", getCountriesFromJson());

    async function getCountriesFromJson() {
        await fetch('../data.json')
            .then((response) => response.json())
            .then((data) => data.forEach(country => drawCountry(country)))
}

pageMode.addEventListener("click", () => {
    const pageTheme = document.querySelector(".dark-mode");
    pageContainer.classList.toggle("dark-theme");
    document.body.style.backgroundColor= "hsl(207, 26%, 17%)";

    if (pageContainer.classList.contains("dark-theme")) {
        pageTheme.innerHTML = "Light Mode"
    }else {
        pageTheme.innerHTML = "Dark Mode"
    }
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("country-container")) {
        
        window.scrollTo(0, 0)
        async function getTargetCountryFromJson() {
           await fetch('../data.json')
                .then((response) => response.json())
                .then((data) =>
                data.forEach(country => {
                    if (country.numericCode === e.target.id) {
                        displaySelectedCountry(country)
                    }
            }))
        }
        getTargetCountryFromJson();
    }
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-go-back")) {

        countriesDisplay.innerHTML = "";

        const selectedCountry = document.querySelector(".selected-country");
        const goBack = document.querySelector(".go-back")
        selectedCountry.remove();
        const searchCountries = document.createElement("div");
        searchCountries.classList.add("search-countries");
        const selectRegion = document.createElement("div");
        selectRegion.classList.add("select-region");

        searchCountries.innerHTML = `
        <div class="input-container">
            <button class="search-icon">
                <svg class="svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="ico-search" d="M15 15L21 21" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="ico-search" d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#323232" stroke-width="2"/>
                </svg>
            </button>
            <input type="text" name="country" id="country" placeholder="Search for a country..." class="input">
        </div>
        `
        selectRegion.innerHTML = `
            <select name="regions" id="regions" class="regions">
                <option class="filter-regions" value="filter" selected disabled hidden>Filter by Region</option>
                <option class="continent" value="All Countries">All Countries</option>
                <option class="continent" value="Africa">Africa</option>
                <option class="continent" value="Americas">America</option>
                <option class="continent" value="Asia">Asia</option>
                <option class="continent" value="Europe">Europa</option>
                <option class="continent" value="Oceania">Oceania</option>
            </select>
        `

        countriesDisplay.remove();
        goBack.remove()

        pageContent.appendChild(countriesDisplay);
        header.appendChild(searchCountries);
        header.appendChild(selectRegion);

        getCountriesFromJson();
     }
 });

 document.addEventListener("change", (e) => {
    if (e.target.classList.contains("regions")) {
        const selectedRegion = e.target.value;
        console.log(selectedRegion)
        countriesDisplay.innerHTML = "";

        async function getSelectedRegionFromJson() {
            await fetch('../data.json')
                .then((response) => response.json())
                .then((data) =>
                data.forEach(country => {
                    if (country.region === selectedRegion) {
                        drawCountry(country)
                    } else if (selectedRegion === "All Countries"){
                        drawCountry(country)
                    }
            }))
        }
        getSelectedRegionFromJson();
    }
 })

 document.addEventListener("input", (e) => {
    if (e.target.classList.contains("input")) {
        let  countryName = e.target.value.trim();
        countryName = countryName.toLowerCase().charAt(0).toUpperCase()  + countryName.slice(1)
        countriesDisplay.innerHTML = "";

        if (countryName.length  > 0) {
            async function getCountryFromJson() {
                await fetch('../data.json')
                     .then((response) => response.json())
                     .then((data) =>
                     data.forEach(country => {
                       if (country.name.includes(countryName)) {
                            drawCountry(country);
                            countriesDisplay.classList.add("searched-countires");
                         } 
                 }))
             }
             getCountryFromJson();
        } else {
            if (countriesDisplay.classList.contains("searched-countires")) {
                 countriesDisplay.classList.remove('searched-countries')
                console.log(countriesDisplay);
                getCountriesFromJson()
            }
        }
    }
 })

function displaySelectedCountry(country) {

    const header = document.querySelector(".header");
    const searchCountries = document.querySelector(".search-countries");
    const selectRegion = document.querySelector(".select-region");

    countriesDisplay.remove();
    searchCountries.remove();
    selectRegion.remove();

    const goBack = document.createElement("div");
    goBack.classList.add("go-back");
    goBack.innerHTML = ` <button class="btn-go-back">Back</button>`

    const selectedCountry = document.createElement("div");
    selectedCountry.classList.add("selected-country");

    selectedCountry.innerHTML = `
        <div class="country-flag">
            <img src="${country.flags.png}">
        </div>
        <div class="country-informations">
            <h2 class="name">${country.name}</h2>
            <div class="description">
                <div class="left-side-list">
                    <div>
                        <span class="span-name">Native name: </span><span class="span-info">${country.nativeName}</span>
                    </div>
                    <div>
                        <span class="span-name">Population: </span><span class="span-info">${country.population}</span>
                    </div>
                    <div>
                        <span class="span-name">Region: </span><span class="span-info">${country.region}</span>
                    </div>
                    <div>
                        <span class="span-name">Sub Region: </span><span class="span-info">${country.subregion}</span>
                    </div>
                    <div>
                        <span class="span-name">Capital: </span><span class="span-info">${country.capital}</span>
                    </div>
                </div>
                <div class="right-side-list">
                    <div>
                        <span class="span-name">Top Level Domain: </span><span class="span-info">${country.topLevelDomain}</span>
                    </div>
                    <div class="display-inline">
                        <span class="span-name">Currencies: </span>
                        <ul class="span-info">${country.currencies ? country.currencies.map(curr => `<li class="list-item">${curr.name}</li>` ).join(",") : ""}</ul>
                    </div>
                    <div class="display-inline">
                        <span class="span-name">Languages: </span>
                        <ul class="span-info">${country.languages.map(lang => `<li class="list-item">${lang.name}</li>`).join(",")}</ul>
                    </div>
                </div>
            </div>
            <div class="borders">
                <span class="span-name">Border countries:</span>
                <ul class="span-info borders-list">${country.borders ? country.borders.map(bord => `<li class="list-item-border">${bord}</li>`).join("") : ''}</ul>
            </div>
        </div>
        `
        pageContainer.appendChild(selectedCountry);
        header.appendChild(goBack)
}

function drawCountry(country) {
    const countriesContainer = document.querySelector(".countries");
    const countryContainer = document.createElement("button");
    countryContainer.classList.add("country-container");
    countryContainer.id = `${country.numericCode}`;


    countryContainer.innerHTML = `
        <img src="${country.flags.png}">
        <div class="country-information">
            <h2 class="country-name">${country.name}</h2>
            <div>
                <span class="span-name">Population: </span><span class="span-info">${country.population}</span>
            </div>
            <div>
                <span class="span-name">Region: </span><span class="span-info">${country.region}</span>
            </div>
            <div>
                <span class="span-name">Capital: </span><span class="span-info">${country.capital}</span>
            </div>
        </div>
    `
    countriesContainer.appendChild(countryContainer);
}
