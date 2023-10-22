import { Howl, Howler } from "howler";
import { note } from "tonal";

export const Instrument = new Howl({
  src: ["instrumentAudio/bass.mp3"],
  onload() {
    SoundEngine.init();
  },
  onloaderror(e, msg) {
    console.log("load error", e, msg);
  },
});

export const SoundEngine = {
  init() {
    console.log("soundEngine loading");
    const lengthOfNote = 3000;
    let timeIndex = 0;
    for (let i = 23; i <= 72; i++) {
      Instrument["_sprite"][i] = [timeIndex, lengthOfNote];
      timeIndex += lengthOfNote;
    }
  },
  playNote(noteName) {
    let noteIndex = note(noteName).midi;
    console.log(noteIndex);
    Instrument.play(noteIndex.toString());

    // const chordMidiNumbers = soundSequence.map((noteName) => {
    //   return note(noteName).midi;
    // });
    // sound.volume(0.75);
    // chordMidiNumbers.forEach((noteMidiNumber) => {
    //   sound.play(noteMidiNumber.toString());
    // });
  },
};
