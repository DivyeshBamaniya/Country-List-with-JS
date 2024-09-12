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
const darkIcon = document.querySelector(".Dark-icon");
const darkButton = document.querySelector(".DarkMode");
const modeText = document.querySelector("[data-modeText]");


// Dark Button Logic
darkButton.addEventListener('click',()=>{    
    document.body.classList.toggle("dark");
    
    if(document.body.classList.contains("dark")){
    darkIcon.setAttribute("class", "fa-regular fa-sun");
    modeText.innerText = "Light Mode";
    }

    else{
      darkIcon.setAttribute("class", "Dark-icon fa-regular fa-moon fa-rotate-by");
      modeText.innerText = "Dark Mode";  
    } 
})

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
        
    // Fetching data of borders
    if(country.borders){
        country.borders.forEach((border)=>
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(response=> response.json())
            .then(([borderCountry])=>{
                borderCountryTag = document.createElement("a");
                borderCountryTag.href =  `./country.html?name=${borderCountry.name.common}`;
                borderCountryTag.innerText = borderCountry.name.common;
                borderCountries.appendChild(borderCountryTag);
            }
                
            )
        )
    }
    else
        borderCountries.innerText += " --";

  })