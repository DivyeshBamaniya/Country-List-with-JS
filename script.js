const CountryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".Search-input");
const img = document.querySelector(".errorImage");
const darkButton = document.querySelector(".DarkMode");
const darkIcon = document.querySelector(".Dark-icon");
const modeText = document.querySelector("[data-modeText]");

let allCountriesData

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

// Initial Data for all countries
fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then((data)=>{
        renderCountries(data);
        allCountriesData = data;
    })

// Filter By Region
filterByRegion.addEventListener('change', e=>{
  
    CountryContainer.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then(response => response.json())
    .then(renderCountries)
})

// Search By Country Name
searchInput.addEventListener('input',(e)=>{


    CountryContainer.innerHTML = "";

    const filteredCountries = allCountriesData.filter(country=> {
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    }
)
    renderCountries(filteredCountries)
    
})



// Dark-Mode implementation
darkButton.addEventListener('click', ()=>{

})
// Function for rendering Data
function renderCountries(data){

    data.forEach(countries => {
        
        const countryCard = document.createElement('a');
        countryCard.classList.add("country-card");
        countryCard.href = `./country.html?name=${countries.name.common}&fullText=true`;
      
        countryCard.innerHTML =
                    `<img src="${countries.flags.svg}" alt="Flag">
                    <div class="card-text">
                        <h3 class="card-title">${countries?.name?.common}</h3>
                        <p><strong>Population: </strong>${countries?.population.toLocaleString("en-In")}</p>
                        <p><strong>Region: </strong>${countries?.region}</p>
                        <p><strong>Capital: </strong>${countries?.capital?countries?.capital.join(", "):"No capital"}</p>
                    </div>`
        CountryContainer.appendChild(countryCard);          
        }
    )
}