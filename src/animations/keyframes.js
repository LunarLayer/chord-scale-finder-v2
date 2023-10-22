export function addKeyframesForStringVibration(
  vibrationLength,
  fretboardWidth
) {
  const percentage = (vibrationLength / fretboardWidth) * 100;
  let skewY = 0.5 + 1 * (1 - percentage / 100);
  var keyframes = "";
  let percent = 100;
  let skewYPart = skewY / percent;

  addKeyFrameSkewY(0, 0);
  for (let i = 1; i <= 99; i++) {
    skewY -= skewYPart;
    if (i % 2 === 0) {
      addKeyFrameSkewY(i, -skewY);
    } else {
      addKeyFrameSkewY(i, skewY);
    }
  }
  addKeyFrameSkewY(100, 0);

  let styleSheet = document.styleSheets[0];
  let keyframesRule = null;

  for (let i = 0; i < styleSheet.cssRules.length; i++) {
    if (styleSheet.cssRules[i].name === "dynamicSkew") {
      keyframesRule = styleSheet.cssRules[i];
      break;
    }
  }

  if (keyframesRule) {
    keyframesRule.cssText = `@keyframes stringVibration { ${keyframes} }`;
  } else {
    styleSheet.insertRule(
      `@keyframes stringVibration { ${keyframes} }`,
      styleSheet.cssRules.length
    );
  }

  function addKeyFrameSkewY(percent, skewY) {
    keyframes += `${percent}% {
      transform: skewY(${skewY}deg);
    }`;
  }
}
