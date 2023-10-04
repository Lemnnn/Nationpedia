const CountryAPI = async () => {
  const data = await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return data;
};

displayCounties();

async function displayCounties(value = "") {
  const countries = await CountryAPI();
  const countryCards = document.querySelector(".countryCards");
  const contriesHTML = countries
    .filter((el) => el.name.common.toLowerCase().includes(value.toLowerCase()))
    .map(
      (country) =>
        (country = `
        <div class="countryCard">
          <img class="countryFlag" src="${country.flags.png}" />
          <h2 class="country">${country.name.common}</h2>
          <div class="countryDetails">
            <p>Population: ${country.population.toLocaleString("en-US")}</p>
            <p>Region: ${country.region}</p>
            <p>Capital: ${
              country.capital ? country.capital : " Has no capital"
            }</p>
          </div>
        </div>
     `)
    );

  console.log(value);

  countryCards.innerHTML = contriesHTML.join("");
}

const input = document.querySelector(".searchBar");

input.addEventListener("input", (e) => {
  const value = e.target.value;
  displayCounties(value);
});
