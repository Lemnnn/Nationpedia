class CountryDetails {
  constructor() {
    this.countryDetails = document.querySelector(".countryDetails");
    this.data = {};
  }

  async fetchCountryData(countryName) {
    await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => res.json())
      .then((data) => {
        this.data = data[0];
      });
  }

  async displayCountryDetails(countryName) {
    await this.fetchCountryData(countryName);
    this.countryDetails.innerHTML = `
                <h1>${this.data.name.common}</h1>
                <p>Capital: ${this.data.capital}</p>
                <p>Population: ${this.data.population}</p>
                <p>Region: ${this.data.region}</p>
          `;
  }
}

const countryDetails = new CountryDetails();

const main = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const countryName = urlParams.get("country");
  const viewMode = document.querySelector(".viewModeButton");

  await countryDetails.displayCountryDetails(countryName);

  viewMode.addEventListener("click", () => {
    document.body.classList.toggle("darkMode");
    if (document.body.classList.contains("darkMode")) {
      viewMode.textContent = "Light Mode";
    } else {
      viewMode.textContent = "Dark Mode";
    }
  });
};

main();
