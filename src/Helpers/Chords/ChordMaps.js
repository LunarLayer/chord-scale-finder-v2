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
    1: [1, 2], // 1 | b2
    2: [1, 2], // sus2 | 9
    3: [3, 4], //b3 | #9
    4: [3, 4], // 3 | 10
    5: [], // sus4 | 11
    6: [6, 7, 8], // b5 | #11
    7: [6, 7, 8], // 5 | 12
    8: [6, 7, 8], // #5 | b13
    9: [], // 6 | 13
    10: [10, 11], // b7
    11: [10, 11], // maj7
  },

  chordQualities: {
    default: [
      {
        extension: 7,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
        ],
      },
      {
        extension: 9,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
          { number: 2, isOmittable: false },
        ],
      },
      {
        extension: 11,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 5, isOmittable: false },
        ],
      },
      {
        extension: 13,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: true },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 5, isOmittable: false },
          { number: 9, isOmittable: false },
        ],
      },
    ],
    major: [
      {
        extension: 5,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 7, isOmittable: false },
        ],
      },
      {
        extension: null,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
        ],
      },
      {
        extension: 7,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 11, isOmittable: false },
        ],
      },
      {
        extension: 9,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 11, isOmittable: false },
          { number: 2, isOmittable: false },
        ],
      },
      {
        extension: 11,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 11, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 5, isOmittable: false },
        ],
      },
      {
        extension: 13,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 11, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 5, isOmittable: true },
          { number: 9, isOmittable: false },
        ],
      },
    ],
    minor: [
      {
        extension: null,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 7, isOmittable: true },
        ],
      },
      {
        extension: 7,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
        ],
      },
      {
        extension: 9,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
          { number: 2, isOmittable: false },
        ],
      },
      {
        extension: 11,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 5, isOmittable: false },
        ],
      },
      {
        extension: 13,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 7, isOmittable: true },
          { number: 10, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 5, isOmittable: true },
          { number: 9, isOmittable: false },
        ],
      },
    ],
    diminished: [
      {
        extension: null,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 6, isOmittable: false },
        ],
      },
      {
        extension: 7,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 6, isOmittable: false },
          { number: 9, isOmittable: false },
        ],
      },
      {
        extension: 9,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 6, isOmittable: false },
          { number: 9, isOmittable: false },
          { number: 2, isOmittable: false },
        ],
      },
      {
        extension: 11,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 3, isOmittable: false },
          { number: 6, isOmittable: false },
          { number: 9, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 5, isOmittable: false },
        ],
      },
    ],
    augmented: [
      {
        extension: null,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 8, isOmittable: false },
        ],
      },
      {
        extension: 7,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 8, isOmittable: false },
          { number: 10, isOmittable: false },
        ],
      },
      {
        extension: 9,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 8, isOmittable: false },
          { number: 10, isOmittable: false },
          { number: 2, isOmittable: false },
        ],
      },
      {
        extension: 11,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 8, isOmittable: false },
          { number: 10, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 5, isOmittable: false },
        ],
      },
      {
        extension: 13,
        intervals: [
          { number: 0, isOmittable: false },
          { number: 4, isOmittable: false },
          { number: 8, isOmittable: false },
          { number: 10, isOmittable: false },
          { number: 2, isOmittable: true },
          { number: 5, isOmittable: true },
          { number: 9, isOmittable: false },
        ],
      },
    ],
  },
};
