import { Howl, Howler } from "howler";
import { note } from "tonal";

let strings = [
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
  { sound: null, timeout: null },
];
let noteLength = 3000;
let sound;
let loadingProgress;

export const soundEngine = {
  state() {
    return sound.state();
  },
  getLoadingProgress() {
    return loadingProgress;
  },
  loadSoundFile(soundFile) {
    sound = new Howl({
      src: [`instrumentSounds/${soundFile}`],
      instrumentSound: "jazzbass",
      onload() {
        soundEngine.initSprites();
        console.log("loaded soundEngine");
      },
      onloaderror(e, msg) {
        console.log("Error", e, msg);
      },
    });
  },
  initSprites() {
    console.log("initSprites");
    let timeIndex = 0;
    for (let i = 23; i < 73; i++) {
      sound["_sprite"][i] = [timeIndex, noteLength];
      timeIndex += noteLength;
    }
  },
  playNote(noteName, stringNumber) {
    // console.log("XXX");
    // console.log(noteName);
    // console.log(stringNumber);
    let string = strings[stringNumber];
    let spriteIndex = note(noteName).midi.toString();
    if (string.timeout) clearTimeout(string.timeout);
    if (sound.playing(string.sound)) sound.fade(1, 0, 50, string.sound);
    string.sound = sound.play(spriteIndex);
    sound.fade(0, 1, 15, string.sound); // gently fade in the sound to avoid speaker "pop".
    string.timeout = setTimeout(() => {
      sound.fade(1, 0, 150, string.sound);
    }, 2850);
  },
};

// in appLayout
// useEffect(() => {
//   const checkSoundIsReady = setInterval(() => {
//     if (soundEngine.state() === "loaded") {
//       setSoundIsReady(true);
//       clearInterval(checkSoundIsReady);
//     }
//   }, 10);
//   return () => {
//     clearInterval(checkSoundIsReady);
//   };
// }, []);
