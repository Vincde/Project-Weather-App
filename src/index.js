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
    createBar();

    populateFirstBar();

    const weather = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=ee0f8ecf676b472ebc1102115242005&q=${name}`,
      { mode: "cors" }
    );

    populateSecondBar();

    const data = await weather.json();

    populateThirdBar();
    populateFourthBar();

    await workDataAndPrintIt(data);

    clearBar();
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
  const paras = document.querySelectorAll("body div:last-of-type > p");

  for (let elem of paras) {
    elem.textContent = "";
  }
}

function createBar() {
  const container = document.createElement("div");
  const firstP = document.querySelector("body div > p:first-of-type");
  const divPara = document.querySelector("body div:last-of-type");
  const loadingText = document.createElement("span");

  container.setAttribute("class", "loading");

  for (let i = 0; i < 4; i++) {
    const subContainer = document.createElement("div");
    subContainer.setAttribute("class", "subContainer");
    container.appendChild(subContainer);
  }
  firstP.parentElement.parentNode.insertBefore(container, divPara);
  firstP.parentElement.parentNode.insertBefore(loadingText, divPara);
}

function populateFirstBar() {
  const loadingText = document.querySelector("span");
  const firstSubContainer = document.querySelector(
    ".loading > div:first-of-type"
  );

  firstSubContainer.style.background = "green";
  loadingText.textContent = "Starting download!";
}

function populateSecondBar() {
  const loadingText = document.querySelector("span");
  const secondSubContainer = document.querySelector(
    ".loading > div:nth-child(2)"
  );

  secondSubContainer.style.background = "green";
  loadingText.textContent = "finished fetching data";
}

function populateThirdBar() {
  const loadingText = document.querySelector("span");
  const thirdSubContainer = document.querySelector(
    ".loading > div:nth-child(3)"
  );

  thirdSubContainer.style.background = "green";
  loadingText.textContent = "finished transforming data into readable objects";
}

function populateFourthBar() {
  const loadingText = document.querySelector("span");
  const fourthSubContainer = document.querySelector(
    ".loading > div:last-of-type"
  );

  fourthSubContainer.style.background = "green";
  loadingText.textContent = "printingData...";
}

function clearBar() {
  const loadingContainer = document.querySelector(".loading");
  const span = document.querySelector("span");

  loadingContainer.parentElement.removeChild(loadingContainer);
  span.parentElement.removeChild(span);
}
