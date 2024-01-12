export function animateCollapseMenu(menuElem) {
  menuElem.style.maxHeight = null;
}

export function animateExpandMenu(menuElem) {
  menuElem.style.maxHeight = menuElem.scrollHeight + "px";
}
