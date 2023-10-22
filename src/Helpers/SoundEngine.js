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
const noteLength = 3000;
const sound = new Howl({
  src: ["instrumentAudio/jazzbass.mp3"],
  onload() {
    soundEngine.initSprites();
  },
  onloaderror(e, msg) {
    console.log("Error", e, msg);
  },
});

export const soundEngine = {
  initSprites() {
    let timeIndex = 0;
    for (let i = 23; i < 73; i++) {
      sound["_sprite"][i] = [timeIndex, noteLength];
      timeIndex += noteLength;
    }
  },
  playNote(noteName, stringNumber) {
    console.log(stringNumber);
    let string = strings[stringNumber];
    let midi = note(noteName).midi;

    if (string.timeout) clearTimeout(string.timeout);
    sound.fade(1, 0, 50, string.sound);
    string.sound = sound.play(midi.toString());
    string.timeout = setTimeout(() => {
      sound.fade(1, 0, 1000, string.sound);
    }, 2000);
  },
};

// let s1 = "";
// let s2 = "";
// let stringSounds = [];
// let string = new Howl({
//   src: ["/instrumentAudio/test.mp3"],
//   sprite: {
//     string1Current: [0, 0],
//     string1Next: [0, 0],
//     string2Current: [0, 0],
//     string2Next: [0, 0],
//     string3current: [0, 0],
//     string3Next: [0, 0],
//     string4current: [0, 0],
//     string4Next: [0, 0],
//   },
//   onloaderror(e, msg) {
//     console.log("load error", e, msg);
//   },
// });

// export function initSoundEngineFor(instrument, tuning) {
// if (instrument === "defaultFretboard" && tuning) {
//   // for (let i = 0; i < tuning.length; i++) {
//   let stringSound = new Howl({
//     src: ["/instrumentAudio/test.mp3"],
//     sprite: {
//       string1current: [0, 0],
//       string1next: [0, 0],
//       string2current: [0, 0],
//       string2next: [0, 0],
//       string3current: [0, 0],
//       string3next: [0, 0],
//       string4current: [0, 0],
//       string4next: [0, 0],
//     },
//     onloaderror(e, msg) {
//       console.log("load error", e, msg);
//     },
//   });
//   // stringSounds.push(stringSound);
//   string = stringSound;
//   // }
//   // console.log(stringSounds);
//   // }
// }
// function getAudioStartIndex(midi) {
//   // 23 to 72
//   let audioStartIndex = midi - 23;
//   let noteLength = 3000;
//   let res = 0;
//   for (let i = 0; i < audioStartIndex; i++) {
//     res += noteLength;
//   }
//   return res;
// }

// export const soundEngine = {
//   test() {
//     let c1 = note("C2").midi;
//     let c2 = note("C#2").midi;
//     let c3 = note("C3").midi;
//     let c4 = note("C4").midi;
//     let c5 = note("C5").midi;
//     let c6 = note("C6").midi;
//     let c7 = note("C7").midi;
//     let playFrom = getAudioStartIndex(c1);

//     if (string.playing("string1current")) {
//       string.fade(1, 0, 50, s1);
//       setTimeout(() => {
//         string.stop(s1);
//       }, 50);

//       playFrom = getAudioStartIndex(c2);
//       string._sprite.string1Next = [playFrom, 3000];
//       s2 = string.play("string1Next");
//     } else {
//       if (string.playing(s2)) {
//         console.log("knockout");
//         string.fade(1, 0, 50, s2);
//         setTimeout(() => {
//           string.stop(s2);
//         }, 50);
//       }
//       console.log("just go");
//       string._sprite.string1Current = [playFrom, 3000];
//       s1 = string.play("string1Current");
//     }
//   },
// play(noteName, stringNumber) {
//   let midiNote = note(noteName).midi;
//   let string = stringSounds[stringNumber];
//   let playFrom = getAudioStartIndex(midiNote);

//   if (string.playing()) {
//     console.log("playing");
//     string.fade(1, 0, 50);
//     setTimeout(() => {
//       string.stop("sound");
//     }, 50);
//     string._sprite.sound2 = [playFrom, 3000];
//     string.play("sound2");
//   } else {
//     console.log("not playing");
//     string._sprite.sound = [playFrom, 3000];
//     string.play("sound");
//     setTimeout(() => {
//       string.fade(1, 0, 100);
//     }, 2900);
//     setTimeout(() => {
//       string.stop();
//     }, 3000);
//   }
// },
// };

// export function initSoundEngineFor(instrument, tuning) {
//   if (instrument === "defaultFretboard" && tuning) {
//     for (let i = 0; i < tuning.length; i++) {
//       let stringSound = new Howl({
//         src: ["instrumentAudio/pianosprite.mp3"],
//         onloaderror(e, msg) {
//           console.log("load error", e, msg);
//         },
//       });
//       stringSounds.push(stringSound);
//     }
//     console.log(stringSounds);
//   }
// }
// function getAudioStartIndex(midi) {
//   let audioStartIndex = midi - 24;
//   let noteLength = 2300;
//   let res = 0;
//   for (let i = 0; i < audioStartIndex; i++) {
//     res += noteLength;
//   }
//   return res;
// }
// export const soundEngine = {
//   play(noteName, stringNumber) {
//     console.log("soundEngine.play()");
//     let midiNote = note(noteName).midi;
//     let string = stringSounds[stringNumber];
//     // string.volume(0.1);
//     let playFrom = getAudioStartIndex(midiNote);
//     string.stop();
//     string._sprite.sound = [playFrom, 2300];
//     string.play("sound");
//   },
// };
