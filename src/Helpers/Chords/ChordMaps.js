export const ChordMaps = {
  notes: [
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
  ],

  similarIntervals: {
    1: [1, 2],
    2: [1, 2],
    3: [3, 4],
    4: [3, 4],
    5: [5],
    6: [6, 7, 8],
    7: [6, 7, 8],
    8: [6, 7, 8],
    9: [9],
    10: [10, 11],
    11: [10, 11],
  },

  alterChords: {
    0: "1",
    1: "b2",
    2: "sus2",
    3: "b3",
    4: "3",
    5: "4",
    6: "b5",
    7: "5",
    8: "#5",
    9: "6",
    10: "b7",
    11: "7",
  },

  addChords: {
    0: "1",
    1: "b9",
    2: "9",
    3: "#9",
    4: "10",
    5: "11",
    6: "#11",
    7: "12",
    8: "b13",
    9: "13",
    10: "#13",
    11: "14",
  },

  chordTypes: {
    default: [
      {
        symbol: "7",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
        ],
      },
      {
        symbol: "9",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
        ],
      },
      {
        symbol: "11",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 4, isOmittable: false },
          { number: 5, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
        ],
      },
      {
        symbol: "13",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 4, isOmittable: true },
          { number: 5, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 9, isOmittable: false },
          { number: 10, isOmittable: false },
        ],
      },
    ],
    major: [
      {
        symbol: "maj",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
        ],
      },
      {
        symbol: "maj7",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 11, isOmittable: false },
        ],
      },
      {
        symbol: "maj9",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 11, isOmittable: false },
        ],
      },
      {
        symbol: "maj11",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 4, isOmittable: false },
          { number: 5, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 11, isOmittable: false },
        ],
      },
      {
        symbol: "maj13",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 4, isOmittable: false },
          { number: 5, isOmittable: true },
          { number: 7, isOmittable: true },
          { number: 9, isOmittable: false },
          { number: 11, isOmittable: false },
        ],
      },
    ],
    minor: [
      {
        symbol: "min",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 7, isOmittable: true },
        ],
      },
      {
        symbol: "min7",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
        ],
      },
      {
        symbol: "min9",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
        ],
      },
      {
        symbol: "min11",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 3, isOmittable: false },
          { number: 5, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
        ],
      },
      {
        symbol: "min13",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 3, isOmittable: false },
          { number: 5, isOmittable: true },
          { number: 7, isOmittable: true },
          { number: 9, isOmittable: false },
          { number: 10, isOmittable: false },
        ],
      },
    ],
    diminished: [
      {
        symbol: "dim",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 6, isOmittable: false },
        ],
      },
      {
        symbol: "dim7",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 6, isOmittable: false },
          { number: 9, isOmittable: false },
        ],
      },
      {
        symbol: "dim9",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 6, isOmittable: false },
          { number: 9, isOmittable: false },
        ],
      },
      {
        symbol: "dim11",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 3, isOmittable: false },
          { number: 5, isOmittable: false },
          { number: 6, isOmittable: false },
          { number: 9, isOmittable: false },
        ],
      },
    ],
    augmented: [
      {
        symbol: "aug",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 8, isOmittable: false },
        ],
      },
      {
        symbol: "aug7",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 8, isOmittable: false },
          { number: 10, isOmittable: false },
        ],
      },
      {
        symbol: "aug9",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 8, isOmittable: false },
          { number: 10, isOmittable: false },
        ],
      },
      {
        symbol: "aug11",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 4, isOmittable: false },
          { number: 5, isOmittable: false },
          { number: 8, isOmittable: false },
          { number: 10, isOmittable: false },
        ],
      },
      {
        symbol: "aug13",
        intervals: [
          { number: 0, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 4, isOmittable: false },
          { number: 5, isOmittable: true },
          { number: 8, isOmittable: false },
          { number: 9, isOmittable: false },
          { number: 10, isOmittable: false },
        ],
      },
    ],
  },

  // chordExtensions: [
  //   { symbol: "5", intervals: [0, 7] },
  //   { symbol: "6", intervals: [9] },
  //   { symbol: "sus2", intervals: [0, 2, 7] },
  //   { symbol: "sus(b2)", intervals: [0, 1, 7] },
  //   { symbol: "sus4", intervals: [0, 5, 7] },
  //   // { symbol: "sus(#4)", intervals: [0, 5, 7] },
  //   { symbol: "b6", intervals: [0, 4, 7, 8] },
  //   { symbol: "6/9", intervals: [0, 2, 4, 7, 9] },
  //   { symbol: "m6/9", intervals: [0, 2, 3, 7, 9] },
  //   { symbol: "#9", intervals: [0, 3, 4, 7, 10] },
  //   { symbol: "#9", intervals: [0, 3, 4, 7, 10] },
  //   { symbol: "add9", intervals: [0, 2, 4, 7] },
  //   { symbol: "b9", intervals: [0, 1, 4, 7, 10] },
  //   // { symbol: "b5", intervals: [0, 1] },
  //   { symbol: "b5", intervals: [0, 6] },
  //   // { symbol: "#11", intervals: [0, 4, 6, 7, 11] },
  //   // { symbol: "#11", intervals: [1, 8] },
  //   // { symbol: "#11", intervals: [1, 9] },
  //   { symbol: "b13", intervals: [0, 4, 7, 9, 10] },
  // ],
};

// const intervalMap = {
//   "perfect unison": 0,
//   "minor 2nd": 1,
//   "augmented unison": 1,
//   "major 2nd": 2,
//   "doubly augmented second": 2,
//   "diminished third": 2,
//   "whole tone": 2,
//   "minor 3rd": 3,
//   "augmented second": 3,
//   "major 3rd": 4,
//   "diminished fourth": 4,
//   tritone: 4,
//   "perfect 4th": 5,
//   "augmented third": 5,
//   "doubly augmented fourth": 5,
//   "diminished fifth": 6,
//   "triply diminished fifth": 6,
//   "augmented fourth": 6,
//   "perfect 5th": 7,
//   "diminished sixth": 7,
//   "minor 6th": 8,
//   "augmented fifth": 8,
//   "diminished seventh": 9,
//   "major 6th": 9,
//   "minor 7th": 10,
//   "augmented sixth": 10,
//   "major 7th": 11,
//   "diminished octave": 11,
//   "perfect octave": 12,
//   "augmented seventh": 12,
//   "minor 9th": 13,
//   "augmented octave": 13,
//   "major 9th": 14,
//   "minor 10th": 15,
//   "augmented ninth": 15,
//   "major 10th": 16,
//   "perfect 11th": 17,
//   "augmented tenth": 17,
//   "diminished twelfth": 17,
//   "perfect 12th": 19,
//   "augmented eleventh": 19,
//   "minor 13th": 20,
//   "augmented twelfth": 21,
//   "major 13th": 21,
//   "minor 14th": 22,
//   "augmented thirteenth": 22,
//   "major 14th": 23,
//   "double octave": 24,
// };

// const chordTypes = {
//   no3: ["perfect unison", "perfect 5th"],
//   Maj: ["perfect unison", "major 3rd", "perfect 5th"],
//   m: ["perfect unison", "minor 3rd", "perfect 5th"],
//   dim: ["perfect unison", "minor 3rd", "diminished 5th"],
//   aug: ["perfect unison", "major 3rd", "augmented 5th"],
//   sus2: ["perfect unison", "major 2nd", "perfect 5th"],
//   sus4: ["perfect unison", "perfect 4th", "perfect 5th"],
//   Maj7: ["perfect unison", "major 3rd", "perfect 5th", "major 7th"],
//   m7: ["perfect unison", "minor 3rd", "perfect 5th", "minor 7th"],
//   7: ["perfect unison", "major 3rd", "perfect 5th", "minor 7th"],
//   dim7: ["perfect unison", "minor 3rd", "diminished 5th", "major 6th"],
//   mMaj7: ["perfect unison", "minor 3rd", "perfect 5th", "major 7th"],
//   Maj9: [
//     "perfect unison",
//     "major 3rd",
//     "perfect 5th",
//     "major 7th",
//     "major 9th",
//   ],
//   m9: ["perfect unison", "minor 3rd", "perfect 5th", "minor 7th", "major 9th"],
//   9: ["perfect unison", "major 3rd", "perfect 5th", "minor 7th", "major 9th"],
//   add9: ["perfect unison", "major 3rd", "perfect 5th", "major 9th"],
//   11: [
//     "perfect unison",
//     "major 3rd",
//     "perfect 5th",
//     "minor 7th",
//     "major 9th",
//     "perfect 11th",
//   ],
//   Maj11: [
//     "perfect unison",
//     "major 3rd",
//     "perfect 5th",
//     "major 7th",
//     "perfect 11th",
//   ],
//   m11: [
//     "perfect unison",
//     "minor 3rd",
//     "perfect 5th",
//     "minor 7th",
//     "major 9th",
//     "perfect 11th",
//   ],
//   13: [
//     "perfect unison",
//     "major 3rd",
//     "perfect 5th",
//     "minor 7th",
//     "major 9th",
//     "perfect 11th",
//     "major 13th",
//   ],
//   Maj13: [
//     "perfect unison",
//     "major 3rd",
//     "perfect 5th",
//     "major 7th",
//     "perfect 11th",
//     "major 13th",
//   ],
//   m13: [
//     "perfect unison",
//     "minor 3rd",
//     "perfect 5th",
//     "minor 7th",
//     "major 9th",
//     "perfect 11th",
//     "major 13th",
//   ],
// };
