(function () {
  var image = new Image();
  Object.defineProperty(image, "id", {
    get() {
      image = null;
      location.href = "../../devtools.html";
    },
  });
  setInterval(function () {
    console.dir(image);
  }, 16);
})();
