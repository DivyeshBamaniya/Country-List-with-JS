const CountryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".Search-input");
const img = document.querySelector(".errorImage");

// Initial Data for all countries
fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(renderCountries)

// Filter By Region
filterByRegion.addEventListener('change', e=>{
  
    CountryContainer.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then(response => response.json())
    .then(renderCountries)
})

// Search By Country Name
searchInput.addEventListener('change',(e)=>{

    CountryContainer.innerHTML = "";
    fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
    .then(response => response.json())
    .then(renderCountries)
    .catch(
        // Function shows when No country is found as inserted
        ()=>{
            const imgNotFound =  document.createElement("img");
            imgNotFound.src = "./images/not-found.png";
            imgNotFound.style.width = "250px";
            imgNotFound.style.height = "300px";
            img.style.display = "block";
            CountryContainer.innerHTML = "";
            img.appendChild(imgNotFound);
        }
    )
    
})

function renderCountries(data){

    if(data == ""){
        console.log("Not found");
        
    }
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