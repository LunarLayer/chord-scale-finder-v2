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
let sound = new Howl({
  src: ["instrumentSounds/jazzbass.mp3"],
  instrumentSound: "jazzbass",
  onload() {
    soundEngine.initSprites();
    console.log("loaded soundEngine");
  },
  onloaderror(e, msg) {
    console.log("Error", e, msg);
  },
});

export const soundEngine = {
  state() {
    return sound.state();
  },
  initSprites() {
    let timeIndex = 0;
    for (let i = 23; i < 73; i++) {
      sound["_sprite"][i] = [timeIndex, noteLength];
      timeIndex += noteLength;
    }
  },
  setInstrumentSound(instrument, instrumentSound) {
    sound = new Howl({
      src: [`instrumentSounds/${instrumentSound}.mp3`],
      instrumentSound: instrumentSound,
      onload() {
        soundEngine.initSprites();
      },
      onloaderror(e, msg) {
        console.log("Error", e, msg);
      },
    });
  },
  playNote(noteName, stringNumber) {
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

// import { Howl, Howler } from "howler";
// import { note } from "tonal";

// let strings = [
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
//   { sound: null, timeout: null },
// ];
// const noteLength = 3000;

// export const sound = new Howl({
//   src: ["instrumentAudio/jazzbass.mp3"],
//   onload() {
//     soundEngine.initSprites();
//     console.log("loaded soundEngine");
//   },
//   onloaderror(e, msg) {
//     console.log("Error", e, msg);
//   },
// });

// export const soundEngine = {
//   initSprites() {
//     let timeIndex = 0;
//     for (let i = 23; i < 73; i++) {
//       sound["_sprite"][i] = [timeIndex, noteLength];
//       timeIndex += noteLength;
//     }
//   },
//   playNote(noteName, stringNumber) {
//     let string = strings[stringNumber];
//     let spriteIndex = note(noteName).midi.toString();
//     if (string.timeout) clearTimeout(string.timeout);
//     if (sound.playing(string.sound)) sound.fade(1, 0, 50, string.sound);
//     string.sound = sound.play(spriteIndex);
//     sound.fade(0, 1, 15, string.sound); // gently fade in the sound to avoid speaker "pop".
//     string.timeout = setTimeout(() => {
//       sound.fade(1, 0, 150, string.sound);
//     }, 2850);
//   },
// };
