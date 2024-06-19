import { ChordMaps } from "./ChordMaps";
import { Chord } from "./Chord";

export function getChords(selectedNotes, context) {
  // console.log("getChord()");
  // console.log("selectedNotes: ");
  // console.log(selectedNotes);
  const possibleChords = [];
  const validChords = [];
  let chordQualities = ChordMaps.chordQualities;

  if (selectedNotes.length === 0) {
    return [new Chord({ root: "N.C. (no chord)" })];
  } else if (selectedNotes.length === 1) {
    return [
      new Chord({
        root: selectedNotes[0].pc,
        quality: "major",
        notes: [selectedNotes[0].pc],
        intervals: [{ number: 0, isOmittable: false }],
      }),
    ];
  }

  let selectedIntervals = getIntervalsFrom(selectedNotes);
  let root = selectedNotes[0].pc;
  // console.log("selected intervals: ", selectedIntervals);

  for (let chordQuality in chordQualities) {
    for (let chord of chordQualities[chordQuality]) {
      const quality = chordQuality;
      const extension = chord.extension;
      const intervals = chord.intervals.slice(); // make a copy to avoid mutating

      let possibleChord = new Chord({
        root,
        quality,
        extension,
        intervals,
      });

      let missingFromSelected =
        possibleChord.getMissingIntervalsFromSelected(selectedIntervals);

      let missingChordIntervals =
        possibleChord.getMissingChordIntervals(selectedIntervals);

      for (let interval of missingFromSelected) {
        possibleChord.extendOrAlter(interval);
      }

      possibleChord.handleMissingChordIntervals(missingChordIntervals);

      if (possibleChord.isValid) validChords.push(possibleChord);
    }
  }

  for (let chord of validChords) {
    chord.prepareForDisplay();
    // possibleChord.handleMissingChordIntervals(selectedIntervals); ?

    if (chord.intervalsMatchExactly(selectedIntervals)) {
      chord.isExactMatch = true;
      // console.log("exact match found: " + chord);
    }
  }

  // upon sorting, consider ranking no3 or no5 higher than alterations.
  // least missing notes + most matching notes
  validChords.sort(
    (chordA, chordB) =>
      chordA.intervals.length -
      selectedIntervals.length -
      (chordB.intervals.length - selectedIntervals.length)
  );

  return validChords;
}

function getPossibleChordExtensions(intervals) {
  let chordExtensions = [];
  for (let extension of chordExtensionsMap) {
    if (extension.intervals.every((interval) => intervals.includes(interval))) {
      chordExtensions.push(extension);
    }
  }
  return chordExtensions;
}

function getIntervalsFrom(notes) {
  // console.log("getIntervalsFrom(notes):");
  // console.log(notes);
  let intervals = [];
  let previous, current;
  let rootIndex = ChordMaps.notes.indexOf(notes[0].pc);

  for (let i = 0; i < notes.length; i++) {
    current = ChordMaps.notes.indexOf(notes[i].pc) - rootIndex;
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
