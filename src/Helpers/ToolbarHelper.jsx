import { getWindowWidth } from "./WindowHelper";

export default function getNoteSizeForKeyChange() {
  let windowWidth = getWindowWidth();
  if (windowWidth <= 600) {
    return 35;
  } else if (windowWidth > 600 && windowWidth <= 900) {
    return 40;
  } else if (windowWidth > 900) {
    return 45;
  }
}
