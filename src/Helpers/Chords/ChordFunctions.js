import { ChordMaps } from "./ChordMaps";
import { Chord } from "./Chord";

export function getChords(
  selectedNotes,
  context,
  onlyShowExactMatches,
  allowedToOmitNotes,
  allowAbstractChords
) {
  let possibleChords = [];

  if (selectedNotes.length === 0) {
    return [new Chord({ symbol: "N.C. (no chord)" })];
  } else if (selectedNotes.length === 1) {
    return [new Chord({ symbol: selectedNotes[0] })]; // intervals: [{number: 0, isOmittable: false}]?
  }

  let rootNote = selectedNotes[0];
  let selectedIntervals = getIntervalsFrom(selectedNotes);

  for (let chordType in ChordMaps.chordTypes) {
    for (let chord of ChordMaps.chordTypes[chordType]) {
      let possibleChord = new Chord({
        symbol: rootNote + chord.symbol,
        intervals: chord.intervals,
      });

      if (onlyShowExactMatches) {
        if (possibleChord.intervalsMatchExactly(selectedIntervals))
          return [possibleChord];
      } else {
        handleMissingIntervals(
          possibleChord,
          selectedIntervals,
          allowedToOmitNotes
        );

        if (
          !possibleChord.isAbstract ||
          (possibleChord.isAbstract && allowAbstractChords)
        ) {
          console.log(possibleChord.isAbstract);
          possibleChords.push(possibleChord);
        }
      }
    }
  }

  // for (let chord of possibleChords) {
  //   chord.prepareForDisplay();
  // }

  possibleChords.sort(
    (chordA, chordB) => chordA.missingIntervals - chordB.missingIntervals
  );
  return possibleChords;
}

function handleMissingIntervals(
  possibleChord,
  selectedIntervals,
  allowedToOmitNotes
) {
  let missingIntervals = possibleChord.getMissingIntervals(selectedIntervals);
  for (let interval of missingIntervals) {
    if (allowedToOmitNotes) {
      processAllowedOmission(possibleChord, interval);
    } else {
      addAlteration(possibleChord, interval);
    }
  }
}

function processAllowedOmission(possibleChord, interval) {
  if (possibleChord.hasSimilarInterval(interval)) {
    if (possibleChord.canAlterSimilar(interval)) {
      possibleChord.alterSimilar(interval);
    } else {
      addAlteration(possibleChord, interval);
    }
  } else {
    addAlteration(possibleChord, interval);
  }
}

function addAlteration(possibleChord, interval) {
  let alteration = ChordMaps.addChords[interval];
  possibleChord.alterations.push(alteration);
  if (!alteration.includes("b") && !alteration.includes("#")) {
    possibleChord.isAbstract = true;
  }
}

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
