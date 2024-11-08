import { ChordMaps } from "./ChordMaps";
import { Chord } from "./Chord";

export function getChords(selectedNotes, context) {
  const validChords = [];
  let chordQualities = ChordMaps.chordQualities;
  console.log(selectedNotes[0]);
  if (selectedNotes.length === 0) {
    return [new Chord({ root: "N.C. (no chord)" })];
  } else if (selectedNotes.length === 1) {
    return [
      new Chord({
        root: selectedNotes[0],
        quality: "major",
        notes: [selectedNotes[0]],
        intervals: [{ number: 0, isOmittable: false }],
      }),
    ];
  }

  let zeroBasedIntervals = convertToZeroBasedIntervals(selectedNotes);
  let rootNote = selectedNotes[0];

  for (let chordQuality in chordQualities) {
    for (let chord of chordQualities[chordQuality]) {
      const quality = chordQuality;
      const extension = chord.extension;
      const intervals = chord.intervals.slice(); // make a copy to avoid mutating
      // intervals = {number, type, isOmittable}

      let possibleChord = new Chord({
        root: rootNote,
        quality,
        extension,
        intervals,
      });

      let missingFromSelected =
        possibleChord.getMissingIntervalsFromSelected(zeroBasedIntervals);

      let missingChordIntervals =
        possibleChord.getMissingChordIntervals(zeroBasedIntervals);

      for (let interval of missingFromSelected) {
        possibleChord.extendOrAlter(interval);
      }

      possibleChord.checkForNo3AndNo5(missingChordIntervals);

      if (possibleChord.isValid) validChords.push(possibleChord);
    }
  }

  // process the valid chords
  for (let chord of validChords) {
    chord.prepareForDisplay();
    // possibleChord.handleMissingChordIntervals(zeroBasedIntervals); ?

    if (chord.intervalsMatchExactly(zeroBasedIntervals)) {
      chord.isExactMatch = true;
      // console.log("exact match found: " + chord);
    }
  }

  validChords.sort(
    (chordA, chordB) =>
      chordA.intervals.length -
      zeroBasedIntervals.length -
      (chordB.intervals.length - zeroBasedIntervals.length)
  );

  return validChords;
}

function convertToZeroBasedIntervals(selectedNotes) {
  let intervals = [];
  let previous, current;
  let rootIndex = ChordMaps.notes.indexOf(selectedNotes[0]);

  for (let i = 0; i < selectedNotes.length; i++) {
    current = ChordMaps.notes.indexOf(selectedNotes[i]) - rootIndex;
    while (current < previous) {
      current += 12;
    }
    previous = current; // 16
    if (current > 12) current -= 12;

    if (!intervals.includes(current)) intervals.push(current);
  }

  // sort numerically
  intervals = intervals.sort((a, b) => a - b);
  return intervals;
}

function getChordNotesFrom(rootNote, intervals) {
  let chordNotes = [];
  let startIndex = ChordMaps.notes.findIndex((note) => note === rootNote);

  for (let interval of intervals) {
    let noteIndex = startIndex + interval;
    if (noteIndex > 12) noteIndex -= 12;
    chordNotes.push(ChordMaps.notes[noteIndex]);
  }

  return chordNotes;
}

function getSortedChordQualities(chordQualities) {
  // sorting logic
  return chordQualities.toString();
}
