import "./style.css";

(function getCity() {
  const bttn = document.querySelector("button");
  const inputCity = document.getElementById("city");

  bttn.addEventListener("click", () => {
    if (inputCity.validity.patternMismatch) {
      console.log("invalid type of city in input field");
      return;
    }
    clearPara();
    getAPI(inputCity.value);
  });
})();

(function printDOMWebPage() {
  let i = 1;

  const body = document.querySelector("body");
  const containerOfResults = document.createElement("div");

  while (i <= 9) {
    const paragraph = document.createElement("p");
    paragraph.style.visibility = "hidden";
    containerOfResults.appendChild(paragraph);
    i++;
  }

  body.appendChild(containerOfResults);
})();

async function getAPI(name) {
  try {
    const weather = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=ee0f8ecf676b472ebc1102115242005&q=${name}`,
      { mode: "cors" }
    );

    const data = await weather.json();

    workDataAndPrintIt(data);
  } catch (err) {
    console.log(err);
  }
}

function workDataAndPrintIt(data) {
  let rest;
  let weather = data.current.condition.text;

  ({ ...rest } = data.location);
  printDataOnScreen(weather, rest);
}

function printDataOnScreen(weather, rest) {
  let counter = 1;
  const paragraphs = document.querySelectorAll("div > p");

  paragraphs[0].style.visibility = "visible";
  paragraphs[0].textContent = `Weather: ${weather}`;

  for (let key in rest) {
    paragraphs[counter].textContent = `${key} : ${rest[key]}`;
    paragraphs[counter].style.visibility = "visible";
    counter++;
  }
}

function clearPara() {
  const paras = document.querySelectorAll("body > p");

  for (let elem of paras) {
    elem.textContent = "";
  }
}
