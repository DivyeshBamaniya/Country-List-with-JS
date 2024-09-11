const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
     
    // console.log(country);
    flagImage.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;
    population.innerText = country.population.toLocaleString("en-In");
    region.innerText = country.region;
    topLevelDomain.innerText = country.tld.join(", ");

    // Native Country Name 
    // console.log(Object.values(country.name));
    
    if(country.name.nativeName)
        nativeName.innerText = Object.values(country.name.nativeName)[0].common ;
    else
        nativeName.innerText = country.name.common;

    //Sub-region
    if(country.subregion)
        subRegion.innerText = country.subregion;
    else subRegion.innerText = country.region;
     
    // Capital
    if(country.capital)
        capital.innerText = country.capital.join(", ");
    else capital.innerText = "--"

    
    // Currency
    if(country.currencies)
        currencies.innerText = Object.values(country.currencies).map(currency=>currency.name).join(", ");
    else currencies.innerText = "--";
     
    // Languages
    if(country.languages)
        languages.innerText = Object.values(country.languages).join(", ");
    else
        languages.innerText = "--";

    // borderCountries
    // try {
    //     if(country.borders)
    //         country.borders.forEach(element => {
    //             const anchor = document.createElement("a");
    //             anchor.href="#";
    //             anchor.textContent = element;
    //         });

    //     else
    //         borderCountries.textContent = "--";
    // } catch (error) {
        
    // }

  })