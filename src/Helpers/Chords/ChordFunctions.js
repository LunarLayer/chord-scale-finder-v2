import { ChordMaps } from "./ChordMaps";
import { Chord } from "./Chord";

export function getChords(selectedNotes, context) {
  // console.log("getChord()");
  let possibleChords,
    validChords = [];

  if (selectedNotes.length === 0) {
    return [new Chord({ root: "N.C. (no chord)" })];
  } else if (selectedNotes.length === 1) {
    return [
      new Chord({
        root: selectedNotes[0],
        quality: "major",
        notes: [selectedNotes[0]],
        intervals: [0],
      }),
    ];
  }

  let selectedIntervals = getIntervalsFrom(selectedNotes);
  let root = selectedNotes[0];
  // console.log("selected intervals: ", selectedIntervals);

  for (let chordQuality in ChordMaps.chordQualities) {
    for (let chord of ChordMaps.chordQualities[chordQuality]) {
      let possibleChord = new Chord({
        root,
        quality: chordQuality,
        extension: chord.extension,
        intervals: chord.intervals,
      });
      // console.log("chord: " + possibleChord);

      // get all selected intervals that the chord doesn't have
      let missingIntervals =
        possibleChord.getMissingIntervals(selectedIntervals);
      // console.log("Found missing intervals: " + missingIntervals);

      for (let interval of missingIntervals) {
        // console.log("trying to add missing interval: " + interval);
        possibleChord.extendOrAlter(interval);
      }
      if (possibleChord.isValid) validChords.push(possibleChord);
    }
  }

  for (let chord of validChords) {
    chord.prepareForUse();

    if (chord.intervalsMatchExactly(selectedIntervals)) {
      chord.isExactMatch = true;
      // console.log("exact match found: " + chord);
    }
  }

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
  let intervals = [];
  let previous, current;
  let rootIndex = ChordMaps.notes.indexOf(notes[0]);

  for (let i = 0; i < notes.length; i++) {
    current = ChordMaps.notes.indexOf(notes[i]) - rootIndex;
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

// export function getIntervalsDifference(chordIntervals, selectedIntervals) {
//   let difference = 0;
//   let biggestArr, smallestArr;

//   if (chordIntervals.length > selectedIntervals.length) {
//     biggestArr = chordIntervals;
//     smallestArr = selectedIntervals;
//   } else {
//     biggestArr = selectedIntervals;
//     smallestArr = chordIntervals;
//   }

//   for (let interval of biggestArr) {
//     if (!smallestArr.includes(interval)) {
//       difference++;
//     }
//   }
//   return difference;
// }

function getSortedChordQualities(chordQualities) {
  // sorting logic
  return chordQualities.toString();
}
// let missingIntervals =
//   possibleChord.getMissingIntervals(selectedIntervals);
//
// for (let interval of missingIntervals) {
//   if (allowedToOmitNotes) {
//     if (chord.hasSimilarInterval(interval)) {
//       if (chord.canAlterSimilar(interval)) {
//         chord.alterSimilar(interval);
//       } else {
//         let alteration = ChordMaps.addChords(interval);
//         possibleChord.alterations.push(alteration);
//         if (!alteration.includes("b") && !alteration.includes("#"))
//           possibleChord.isAbstract = true;
//       }
//     } else {
//       let alteration = ChordMaps.addChords(interval);
//       possibleChord.alterations.push(alteration);
//       if (!alteration.includes("b") && !alteration.includes("#"))
//         possibleChord.isAbstract = true;
//     }
//   } else {
//     // not allowed to omit notes
//     if (chord.hasSimilarInterval(interval)) {
//       let alteration = ChordMaps.addChords(interval);
//       possibleChord.alterations.push(alteration);
//       if (!alteration.includes("b") && !alteration.includes("#"))
//         possibleChord.isAbstract = true;
//     } else {
//       let alteration = ChordMaps.addChords(interval);
//       possibleChord.alterations.push(alteration);
//     }
//   }
// }
// generate chord symbol
// generate notes array from chord.intervals

// function addAlteration(possibleChord, interval) {
//   let alteration = ChordMaps.addChords[interval];
//   possibleChord.alterations.push(alteration);
//   if (!alteration.includes("b") && !alteration.includes("#")) {
//     possibleChord.isAbstract = true;
//   }
// }

// function identifyPossibleChords(rootNote, intervals) {
//   let possibleChords = [];
//   let possibleChordExtensions = "";

//   let no3,
//     no5,
//     isDim,
//     isAug = false;

//   if (!intervals.includes(3) && !intervals.includes(4)) no3 = true;
//   if (intervals.includes(6)) isDim = true;
//   if (intervals.includes(8)) isAug = true;
//   if (!intervals.includes(7) && !isDim && !isAug) no5 = true;

//   for (let chordType in chordTypesMap) {
//     for (let chord of chordTypesMap[chordType]) {
//       // chord has all intervals or more than the selected intervals
//       if (intervals.every((interval) => chord.intervals.includes(interval))) {
//         possibleChords.push({
//           symbol: rootNote + chord.symbol,
//           notes: [],
//           intervals: chord.intervals,
//         });
//       }
//     }
//   }

//   for (let chord of possibleChords) {
//     let no3no5 = "";
//     // add correct notes to all chord
//     chord.notes = getChordNotesFrom(rootNote, chord.intervals);

//     if (!isDim && !isAug) {
//       if (no3) no3no5 += "no3";
//       if (no5) no3no5 += "no5";
//     }

//     // add "no3" & "no5" to chord
//     chord.symbol += no3no5;
//   }

//   // sort chord qualities of all found chords
//   return possibleChords;
// }
