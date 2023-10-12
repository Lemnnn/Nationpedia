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

    const currencies = this.data.currencies;
    let currencyName;

    for (const currencyKey in currencies) {
      if (currencies.hasOwnProperty(currencyKey)) {
        const currencyInfo = currencies[currencyKey];
        currencyName = currencyInfo.name;
      }
    }

    const languages = this.data.languages;
    let languageName = [];

    for (const languageKey in languages) {
      if (languages.hasOwnProperty(languageKey)) {
        languageName.push(" " + languages[languageKey]);
      }
    }

    this.countryDetails.innerHTML = `
            <div class="countryDetailsContainer">
              <img class="countryDetailsFlag" src="${this.data.flags.png}" />
              <div class="countryDetailsTextContainer">
                <h1><b>${this.data.name.common}</b></h1>
                <div class="countryDetailsContent">
                  <div class="row">
                    <p><b>Population:</b> ${this.data.population.toLocaleString(
                      "en-US"
                    )}</p>
                    <p><b>Area:</b> ${this.data.area.toLocaleString(
                      "en-US"
                    )} km²</p>
                    <p><b>Region:</b> ${this.data.region}</p>
                    <p><b>Sub Region:</b> ${this.data.subregion}</p>
                    </div>
                    <div class="row">
                    <p><b>Capital:</b> ${this.data.capital}</p>
                    <p><b>Top Level Domain:</b> ${this.data.tld[0]}</p>
                    <p><b>Currency:</b> ${currencyName}</p>
                    <p><b>Languages:</b> ${languageName}</p>
                    </div>
                </div>
              </div>
            </div>
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
