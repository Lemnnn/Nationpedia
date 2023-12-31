class Program {
  constructor(region, name) {
    this.region = region;
    this.name = name;
    this.data = [];
  }

  async fetchCountries() {
    await fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
      });
  }

  printCountries() {
    this.displayCountries(this.data);
  }

  handelFilter(name, region) {
    this.name = name;
    this.region = region;
    const filter = this.data
      .filter((el) =>
        el.name.common.toLowerCase().includes(this.name.toLowerCase())
      )
      .filter((el) => el.region.includes(this.region));
    console.log(filter);
    this.displayCountries(filter);
  }

  displayCountries(countries) {
    const countryCards = document.querySelector(".countryCards");

    const contriesHTML = countries.map((country) => {
      const encodedCountryName = encodeURIComponent(
        country.name.common.toLowerCase()
      );
      return `
      <a class="cardLink" href="country.html?country=${encodedCountryName}">
        <div class="countryCard">
          <img class="countryFlag" src="${country.flags.png}" />
          <h2 class="country"><b>${country.name.common}</b></h2>
          <div class="countryDetails">
            <p><b>Population:</b> ${country.population.toLocaleString(
              "en-US"
            )}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Capital:</b> ${
              country.capital ? country.capital : " Has no capital"
            }</p>
          </div>
        </div>
      </a>
     `;
    });

    countryCards.innerHTML = contriesHTML.join("");
  }

  getName() {
    return this.name;
  }

  getRegion() {
    return this.region;
  }
}

const countries = new Program("", "");

const main = async () => {
  await countries.fetchCountries();
  const input = document.querySelector(".searchBar");
  const dropdown = document.querySelector(".dropdown");
  const viewMode = document.querySelector(".viewModeButton");

  countries.printCountries();

  input.addEventListener("input", (e) => {
    countries.handelFilter(e.target.value, countries.getRegion());
  });

  dropdown.addEventListener("change", (e) => {
    countries.handelFilter(countries.getName(), e.target.value);
  });

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
