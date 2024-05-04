import { current, isImmutableDefault } from "@reduxjs/toolkit";

const notesMap = [
  // might need support for enharmonically equivalent name
  "C", //  0  | 12
  "C#", // 1  | 13
  "D", //  2  | 14
  "D#", // 3  | 15
  "E", //  4  | 16
  "F", //  5  | 17
  "F#", // 6  | 18
  "G", //  7  | 19
  "G#", // 8  | 20
  "A", //  9  | 21
  "A#", // 10 | 22
  "B", //  11 | 23
];

const chordQualitiesMap = [
  { symbol: "min", intervals: [0, 3, 7] },
  { symbol: "Maj", intervals: [0, 4, 7] },
  { symbol: "dim", intervals: [0, 3, 6] },
  { symbol: "aug", intervals: [0, 4, 8] },
  { symbol: "sus2", intervals: [2] },
  { symbol: "sus4", intervals: [0, 5] },
  { symbol: "min7", intervals: [0, 7, 10] },
  { symbol: "Maj7", intervals: [0, 7, 11] },
  { symbol: "min6", intervals: [0, 3, 7, 9] },
];
const qualitieses = {
  min: [0, 3, 7],
  min7: [0, 7, 10],
  Maj: [0, 4, 7],
  Maj7: [0, 7, 11],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [2],
  sus4: [0, 5],
  min6: [0, 3, 7, 9],
  7: [0, 4, 7, 10],
  dim7: [0, 3, 6, 9],
  mMaj7: [0, 3, 7, 11],
  Maj9: [0, 4, 7, 11, 14],
  m9: [0, 3, 7, 10, 14],
  9: [0, 4, 7, 10, 14],
  add9: [0, 4, 7, 14],
  11: [17],
  "#11": [18],
  Maj11: [0, 4, 7, 11, 17],
  m11: [0, 3, 7, 10, 14, 17],
  13: [0, 4, 7, 10, 14, 17, 21],
  Maj13: [0, 4, 7, 11, 17, 21],
  m13: [0, 3, 7, 10, 14, 17, 21],
};

function getIntervalsFrom(notes) {
  let intervals = [];
  let previous, current;
  let rootIndex = notesMap.indexOf(notes[0]);

  for (let i = 0; i < notes.length; i++) {
    current = notesMap.indexOf(notes[i]) - rootIndex;
    while (current < previous) {
      current += 12;
    }
    previous = current; // 16
    intervals.push(current);
  }

  console.log("selected intervals: " + intervals);
  return intervals;
}

function getChordQualitiesFrom(intervals) {
  let chordQualities = [];
  for (let chordQuality of chordQualitiesMap) {
    // Look for exact match
    if (intervals.toString() === chordQuality.intervals.toString()) {
      console.log("exact match");
      return chordQuality.symbol;
    }

    // look for partial matches
    let isMatch = true;
    for (let i = 0; i < chordQuality.intervals.length; i++) {
      if (!intervals.includes(chordQuality.intervals[i])) isMatch = false;
    }
    if (isMatch) {
      console.log("match found. Adding: " + chordQuality.symbol);
      chordQualities.push(chordQuality.symbol);
    }
  }

  return chordQualities;
}

function getChordQuality(chordQualities) {
  // sorting logic
  return chordQualities.toString();
}

export function getChord(notes, context) {
  if (notes.length === 0) return { symbol: "", notes: [], intervals: [] };

  let rootNote = notes[0];
  let intervals = getIntervalsFrom(notes);
  let chordQualities = getChordQualitiesFrom(intervals);
  let chordQuality = getChordQuality(chordQualities);
  let chord = {
    symbol: rootNote + chordQuality,
    notes,
    intervals,
  };

  return chord;
}

const intervalMap = {
  "perfect unison": 0,
  "minor 2nd": 1,
  "augmented unison": 1,
  "major 2nd": 2,
  "doubly augmented second": 2,
  "diminished third": 2,
  "whole tone": 2,
  "minor 3rd": 3,
  "augmented second": 3,
  "major 3rd": 4,
  "diminished fourth": 4,
  tritone: 4,
  "perfect 4th": 5,
  "augmented third": 5,
  "doubly augmented fourth": 5,
  "diminished fifth": 6,
  "triply diminished fifth": 6,
  "augmented fourth": 6,
  "perfect 5th": 7,
  "diminished sixth": 7,
  "minor 6th": 8,
  "augmented fifth": 8,
  "diminished seventh": 9,
  "major 6th": 9,
  "minor 7th": 10,
  "augmented sixth": 10,
  "major 7th": 11,
  "diminished octave": 11,
  "perfect octave": 12,
  "augmented seventh": 12,
  "minor 9th": 13,
  "augmented octave": 13,
  "major 9th": 14,
  "minor 10th": 15,
  "augmented ninth": 15,
  "major 10th": 16,
  "perfect 11th": 17,
  "augmented tenth": 17,
  "diminished twelfth": 17,
  "perfect 12th": 19,
  "augmented eleventh": 19,
  "minor 13th": 20,
  "augmented twelfth": 21,
  "major 13th": 21,
  "minor 14th": 22,
  "augmented thirteenth": 22,
  "major 14th": 23,
  "double octave": 24,
};

const chordTypes = {
  no3: ["perfect unison", "perfect 5th"],
  Maj: ["perfect unison", "major 3rd", "perfect 5th"],
  m: ["perfect unison", "minor 3rd", "perfect 5th"],
  dim: ["perfect unison", "minor 3rd", "diminished 5th"],
  aug: ["perfect unison", "major 3rd", "augmented 5th"],
  sus2: ["perfect unison", "major 2nd", "perfect 5th"],
  sus4: ["perfect unison", "perfect 4th", "perfect 5th"],
  Maj7: ["perfect unison", "major 3rd", "perfect 5th", "major 7th"],
  m7: ["perfect unison", "minor 3rd", "perfect 5th", "minor 7th"],
  7: ["perfect unison", "major 3rd", "perfect 5th", "minor 7th"],
  dim7: ["perfect unison", "minor 3rd", "diminished 5th", "major 6th"],
  mMaj7: ["perfect unison", "minor 3rd", "perfect 5th", "major 7th"],
  Maj9: [
    "perfect unison",
    "major 3rd",
    "perfect 5th",
    "major 7th",
    "major 9th",
  ],
  m9: ["perfect unison", "minor 3rd", "perfect 5th", "minor 7th", "major 9th"],
  9: ["perfect unison", "major 3rd", "perfect 5th", "minor 7th", "major 9th"],
  add9: ["perfect unison", "major 3rd", "perfect 5th", "major 9th"],
  11: [
    "perfect unison",
    "major 3rd",
    "perfect 5th",
    "minor 7th",
    "major 9th",
    "perfect 11th",
  ],
  Maj11: [
    "perfect unison",
    "major 3rd",
    "perfect 5th",
    "major 7th",
    "perfect 11th",
  ],
  m11: [
    "perfect unison",
    "minor 3rd",
    "perfect 5th",
    "minor 7th",
    "major 9th",
    "perfect 11th",
  ],
  13: [
    "perfect unison",
    "major 3rd",
    "perfect 5th",
    "minor 7th",
    "major 9th",
    "perfect 11th",
    "major 13th",
  ],
  Maj13: [
    "perfect unison",
    "major 3rd",
    "perfect 5th",
    "major 7th",
    "perfect 11th",
    "major 13th",
  ],
  m13: [
    "perfect unison",
    "minor 3rd",
    "perfect 5th",
    "minor 7th",
    "major 9th",
    "perfect 11th",
    "major 13th",
  ],
};

// Gmaj7(no3) | 0 - 7 - 11           | G - F# - D
// Cmin(add9) | 0 - 3 - 7 - 13       | C - D# - G - C#
// E6sus2#11  | 0 - 2 - 7 - 9 - 18   | E - F# - B - C# - A#
// Emin6      | 0 - 3 - 7 - 9        | E - G - B - C#

// Hvis der er match på alle og chordmap har samme længde -> vælg den

// Check for no3: [0, 7] - hvis ja, smid den i chordQualities array.
// Check for 6:

// Find matching qualities

// const basicIntervalMap = {
//   "perfect unison": 0,
//   "minor 2nd": 1,
//   "major 2nd": 2,
//   "minor 3rd": 3,
//   "major 3rd": 4,
//   "perfect 4th": 5,
//   "augmented 4th": 6,
//   "diminished 5th": 6,
//   "perfect 5th": 7,
//   "minor 6th": 8,
//   "major 6th": 9,
//   "minor 7th": 10,
//   "major 7th": 11,
//   "perfect octave": 12,
//   "minor 9th": 13,
//   "major 9th": 14,
//   "minor 10th": 15,
//   "major 10th": 16,
//   "perfect 11th": 17,
//   "augmented 11th": 18,
//   "diminished 12th": 18,
//   "perfect 12th": 19,
//   "minor 13th": 20,
//   "major 13th": 21,
//   "minor 14th": 22,
//   "major 14th": 23,
//   "double octave": 24,
// };
