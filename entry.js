const boatGif = require("./lib/Styles/boat.gif");
const polyfill = require("terriajs/lib/Core/polyfill");

require("./lib/Styles/loader.css");

function loadMainScript() {
  // load the main chunk
  return new Promise((resolve, reject) => {
    require.ensure(
      ["terriajs/lib/Core/prerequisites"],
      function (require) {
        require("terriajs/lib/Core/prerequisites");
        require.ensure(
          ["./index"],
          function (require) {
            resolve(require("./index"));
          },
          reject,
          "index"
        );
      },
      reject,
      "index"
    );
  });
}

function createLoader() {
  const loaderDiv = document.createElement("div");
  loaderDiv.classList.add("loader-ui");
  const loaderGif = document.createElement("img");
  loaderGif.src = boatGif;
  loaderGif.className = "responsive-gif";
  loaderDiv.appendChild(loaderGif);

  loaderDiv.style.backgroundColor = "#262626";
  document.body.appendChild(loaderDiv);

  polyfill(function () {
    loadMainScript()
      .catch(() => {
        // Ignore errors and try to show the map anyway
      })
      .then(() => {
        loaderDiv.classList.add("loader-ui-hide");
        setTimeout(() => {
          document.body.removeChild(loaderDiv);
        }, 2000);
      });
  });
}

createLoader();
