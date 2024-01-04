export function toggleMenuShowing(menuElem) {
  if (menuElem.style.maxHeight) {
    menuElem.style.maxHeight = null;
    menuElem.classList.remove("showing");
  } else {
    menuElem.style.maxHeight = menuElem.scrollHeight + "px";
    menuElem.classList.add("showing");
  }
}
