console.log("windowHelper");

export function getWindowWidth() {
  let windowWidth =
    window.innerWidth && document.documentElement.clientWidth
      ? Math.min(window.innerWidth, document.documentElement.clientWidth)
      : window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName("body")[0].clientWidth;
  return windowWidth;
}
