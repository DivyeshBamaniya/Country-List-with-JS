const CountryContainer = document.querySelector(".countries-container");
// const CContainer = document.getElementsByClassName(country-card);

fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then((data) => data.forEach(countries => {
        const countryCard = document.createElement('a');
        countryCard.classList.add("country-card");
        countryCard.href = "./country.html";
        countryCard.innerHTML =
            `<img src="${countries.flags.svg}" alt="Flag">
                    <div class="card-text">
                        <h3 class="card-title">${countries.name.common}</h3>
                        <p><strong>Population: </strong>${countries.population}</p>
                        <p><strong>Region: </strong>${countries.region}</p>
                        <p><strong>Capital: </strong>${countries.capital}</p>
                    </div>`
        CountryContainer.appendChild(countryCard);          
    }
    )
)
