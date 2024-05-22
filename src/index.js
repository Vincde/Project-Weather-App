import "./style.css";

(function getCity() {
  const bttn = document.querySelector("button");
  const inputCity = document.getElementById("city");

  bttn.addEventListener("click", () => {
    getAPI(inputCity.value);
  });
})();

async function getAPI(name) {
  const weather = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=ee0f8ecf676b472ebc1102115242005&q=${name}`,
    { mode: "cors" }
  );

  const data = await weather.json();

  console.log(data.location);
}
