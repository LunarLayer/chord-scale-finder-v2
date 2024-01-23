import { Chord, Key, Note, Scale } from "tonal";

export function rotateArray(array) {
  const firstItem = array.shift();
  array.push(firstItem);
  return array;
}

export function getPossibleChordsFrom(notes, assumePerfectFifth) {
  let chordsArray = [];
  for (let i = 0; i < notes.length; i++) {
    let chords, extendedChords, reducedChords;
    if (assumePerfectFifth) {
      chords = Chord.detect(notes, { assumePerfectFifth: true });
    } else {
      chords = Chord.detect(notes, { assumePerfectFifth: false });
    }

    for (let chord of chords) {
      chordsArray.push(chord);
      // rotateArray(notes);
    }
    // some chords might not be generated, need error handling
  }

  // Remove duplicate entries
  let possibleChords = [...new Set(chordsArray)];

  return possibleChords;
}
