const root = document.querySelector("#root");
const url = "https://api.thecatapi.com/v1/images/search";

function preload(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
}

function getRandomCat() {
  let src;

  displayLoading();

  return fetch(url)
    .then((response) => response.json())
    .then((catData) => {
      const cat = catData[0];
      src = cat.url;
      return preload(src);
    })
    .then(() => {
      hideLoading();
      const img = document.createElement("img");
      img.src = src;

      root.innerHTML = "";
      root.append(img);
    });
}

function displayLoading() {
  const div = document.createElement('div');
  div.id = 'loading';
  div.innerText = 'Loading...';
  root.prepend(div);
}

function hideLoading() {
  document.querySelector("#loading").remove();
}

getRandomCat();

root.addEventListener("click", () => {
  getRandomCat();
});
