const root = document.querySelector("#root");
const url = "https://api.thecatapi.com/v1/images/search";

let loading = false;

function create(tag, attributes = {}) {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(attributes)) {
    el[key] = value;
  }

  return el;
}

function preload(src) {
  return new Promise((resolve, reject) => {
    const img = create("img", { src });
    img.onload = resolve;
    img.onerror = reject;
  });
}

// ??????????????
let cache = null;

async function fetchCat() {
  const response = await fetch(url);
  const { url: src } = (await response.json())[0];
  await preload(src);
  return src;
}

async function getRandomCat() {
  if (loading === true) {
    return;
  }

  startLoading();
  const src = await fetchCat();
  stopLoading();

  root.innerHTML = "";
  root.append(create("img", { src }));
}

function startLoading() {
  loading = true;

  const el = create("div", {
    id: "loading",
    innerText: "loading...",
  });

  root.prepend(el);
}

function stopLoading() {
  loading = false;
  document.querySelector("#loading")?.remove();
}

getRandomCat();

root.addEventListener("click", () => {
  getRandomCat().catch((err) => {
    console.log(err);
  });
});
