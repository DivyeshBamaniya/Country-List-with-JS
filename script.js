const CountryContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");

fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(renderCountries)

filterByRegion.addEventListener('change', e=>{
  
fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then(response => response.json())
    .then(renderCountries)
    CountryContainer.innerHTML = "";
})

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