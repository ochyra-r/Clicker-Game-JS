const btnSave = document.querySelector(".save");
const btnClear = document.querySelector(".clear");
const clicker = document.querySelector(".clicker");
const counter = document.querySelector(".counter");
const storage = window.localStorage;

const x2 = document.querySelector('[data-cash="100"]');
const x4 = document.querySelector('[data-cash="400"]');
const x8 = document.querySelector('[data-cash="2000"]');
const x16 = document.querySelector('[data-cash="10000"]');
const x32 = document.querySelector('[data-cash="1000000"]');
const numbersList = document.querySelector(".numbers");

const table = [x2, x4, x8, x16, x32];

let save = {
  count: 0,
  number: 1,
  x2times: 0,
};

const resetBtn = () => {
  x2.classList.add("off");
  x2.removeEventListener("click", double);
  x4.classList.add("off");
  x4.removeEventListener("click", double);
  x8.classList.add("off");
  x8.removeEventListener("click", double);
  x16.classList.add("off");
  x16.removeEventListener("click", double);
  x32.classList.add("off");
  x32.removeEventListener("click", double);
};

const double = (e) => {
  if (e.target.dataset.cash === "100") {
    save.count -= e.target.dataset.cash;
    save.number *= 2;
    save.x2times += 1;
    if (save.count <= e.target.dataset.cash) {
      resetBtn();
    }
  }
  if (e.target.dataset.cash === "400") {
    save.count -= e.target.dataset.cash;
    save.number *= 4;
    if (save.count <= e.target.dataset.cash) {
      resetBtn();
    }
  }
  if (e.target.dataset.cash === "2000") {
    save.count -= e.target.dataset.cash;
    save.number *= 8;
    if (save.count <= e.target.dataset.cash) {
      resetBtn();
    }
  }
  if (e.target.dataset.cash === "10000") {
    save.count -= e.target.dataset.cash;
    save.number *= 16;
    if (save.count <= e.target.dataset.cash) {
      resetBtn();
    }
  }
  if (e.target.dataset.cash === "1000000") {
    save.count -= e.target.dataset.cash;
    save.number *= 32;
    if (save.count <= e.target.dataset.cash) {
      resetBtn();
    }
  }

  counter.textContent = save.count;
  checkMultipler();
};

const checkMultipler = () => {
  if (save.count > 100 && save.x2times < 5) {
    x2.classList.remove("off");
    x2.addEventListener("click", double);
  } else if (save.x2times >= 5) {
    x2.classList.add("disabled");
  }
  if (save.count > 400) {
    x4.classList.remove("off");
    x4.addEventListener("click", double);
  }
  if (save.count > 2000) {
    x8.classList.remove("off");
    x8.addEventListener("click", double);
  }
  if (save.count > 10000) {
    x16.classList.remove("off");
    x16.addEventListener("click", double);
  }
  if (save.count > 1000000) {
    x32.classList.remove("off");
    x32.addEventListener("click", double);
  }
};
checkMultipler();

const load = () => {
  if (storage.getItem("save")) {
    save = JSON.parse(storage.getItem("save"));
    console.log("Save found:", save);
    counter.textContent = save.count;
    checkMultipler();
  } else {
    save.count = 0;
    console.log("Save not found");
    counter.textContent = save.count;
  }
};
load();

const floatingNumber = () => {
  const spanFloat = document.createElement("span");
  spanFloat.classList.add("float");
  spanFloat.textContent = save.number;
  let top = clicker.offsetTop - 30;
  let left = clicker.offsetLeft + 100;
  spanFloat.style.top = top + "px";
  spanFloat.style.left = left + "px";
  numbersList.appendChild(spanFloat);
  setTimeout(() => {
    numbersList.removeChild(spanFloat);
  }, 1000);
};

const click = () => {
  save.count += save.number;
  counter.textContent = save.count;
  checkMultipler();
  floatingNumber();
  if (numbersList) {
  }
};

btnSave.addEventListener("click", function () {
  storage.setItem("save", JSON.stringify(save));
  console.log("Saved game");
});

btnClear.addEventListener("click", function () {
  storage.removeItem("save");
  save.count = 0;
  save.number = 1;
  save.x2times = 0;
  counter.textContent = 0;
  resetBtn();
  numbersList.textContent = "";
  table.forEach((i) => i.classList.remove("disabled"));
  console.log("New Game Started:", save);
});

clicker.addEventListener("click", click);
