import Hammer from "hammerjs"

var reqAnimationFrame = (function () {
  return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();


export {
  reqAnimationFrame,

}
