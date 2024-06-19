import { Chord, Key, Note, Scale } from "tonal";

export function rotateArray(array) {
  const firstItem = array.shift();
  array.push(firstItem);
  return array;
}

export function getSelectedNotes(allNotes) {
  let selectedNotes = [];
  selectedNotes = allNotes.reduce((arr, note) => {
    if (note.selected && !arr.includes(note)) {
      arr.push(note);
    }
    return arr;
  }, []);
  return selectedNotes;
}

export function getScale(notes) {
  let scaleName = Scale.detect(notes);
  let scale = Scale.get(scaleName[0]);
  return scale;
}

export function getInvertedChords(chord) {
  let invertedChords = [];
  let chordNotes = chord.notes;

  for (let i = 0; i < chordNotes.length; i++) {
    let detectedChords = Chord.detect(chordNotes);
    let foundChord = Chord.get(detectedChords[0]);
    if (foundChord.empty === false) invertedChords.push(foundChord);
    chordNotes.push(chordNotes.shift());
  }

  return invertedChords;
}

export function getIntervalsArray(chordIntervals) {
  console.log("intervals: " + chordIntervals);
  let intervals = [
    { interval: "1", active: false },
    { interval: "b2", active: false },
    { interval: "2", active: false },
    { interval: "b3", active: false },
    { interval: "3", active: false },
    { interval: "4", active: false },
    { interval: "b5", active: false },
    { interval: "5", active: false },
    { interval: "#5", active: false },
    { interval: "6", active: false },
    { interval: "b7", active: false },
    { interval: "7", active: false },
    { interval: "8", active: false },
    { interval: "b9", active: false },
    { interval: "9", active: false },
    { interval: "#9", active: false },
    { interval: "", active: false },
    { interval: "11", active: false },
    { interval: "#11", active: false },
    { interval: "", active: false },
    { interval: "", active: false },
    { interval: "13", active: false },
    { interval: "", active: false },
    { interval: "", active: false },
    { interval: "", active: false },
  ];
  for (let interval of chordIntervals) {
    switch (interval) {
      case "1P":
        intervals[0].interval = "1";
        intervals[0].active = true;
        break;
      case "2m":
        intervals[1].interval = "b2";
        intervals[1].active = true;
        break;
      case "2M":
        intervals[2].interval = "2";
        intervals[2].active = true;
        break;
      case "3m":
        intervals[3].interval = "b3";
        intervals[3].active = true;
        break;
      case "3M":
        intervals[4].interval = "3";
        intervals[4].active = true;
        break;
      case "4P":
        intervals[5].interval = "4";
        intervals[5].active = true;
        break;
      case "5d":
        intervals[6].interval = "b5";
        intervals[6].active = true;
        break;
      case "5m":
        intervals[6].interval = "b5";
        intervals[6].active = true;
        break;
      case "4M":
        intervals[6].interval = "#4";
        intervals[6].active = true;
        break;
      case "5P":
        intervals[7].interval = "5";
        intervals[7].active = true;
        break;
      case "5M":
        intervals[8].interval = "#5";
        intervals[8].active = true;
        break;
      case "6m":
        intervals[8].interval = "b6";
        intervals[8].active = true;
        break;
      case "6M":
        intervals[8].interval = "6";
        intervals[8].active = true;
        break;
      case "XXXXX":
        intervals[9].interval = "bb7";
        intervals[9].active = true;
        break;
      case "7m":
        intervals[10].interval = "b7";
        intervals[10].active = true;
        break;
      case "7M":
        intervals[11].interval = "7";
        intervals[11].active = true;
        break;
      case "7d":
        intervals[9].interval = "bb7";
        intervals[9].active = true;
        break;
      case "8P":
        intervals[12].interval = "8";
        intervals[12].active = true;
        break;
      case "9m":
        intervals[13].interval = "b9";
        intervals[13].active = true;
        break;
      case "9P":
        intervals[14].interval = "9";
        intervals[14].active = true;
        break;

      case "9M":
        intervals[15].interval = "#9";
        intervals[15].active = true;
        break;
      case "Never happens 17":
        intervals[16].interval = "";
        intervals[16].active = true;
        break;
      case "11P":
        intervals[17].interval = "11";
        intervals[17].active = true;
        break;
      case "11M":
        intervals[18].interval = "#11";
        intervals[18].active = true;
        break;
      case "Never happens 20":
        intervals[19].interval = "";
        intervals[19].active = true;
        break;
      case "Never happens 21":
        intervals[20].interval = "";
        intervals[20].active = true;
        break;
      case "Never happens 23":
        intervals[22].interval = "";
        intervals[22].active = true;
        break;
      case "13M":
        intervals[21].interval = "13";
        intervals[21].active = true;
        break;
    }
  }
  return intervals;
}

// (incorporate this) - Finds all "normal", extended and reduced chords based on some notes
export function getPossibleChords(selectedNotes, assumePerfectFifth) {
  let chord = "";
  let possibleChords = [];
  for (let i = 0; i < selectedNotes.length; i++) {
    if (assumePerfectFifth) {
      let chordName = Chord.detect(selectedNotes, {
        assumePerfectFifth: true,
      })[0];
      chord = Chord.get(chordName);
      console.log(chordName);
    } else {
      let chordName = Chord.detect(selectedNotes, {
        assumePerfectFifth: false,
      })[0];
      chord = Chord.get(chordName);
    }

    if (!possibleChords.includes(chord)) {
      possibleChords.push(chord);
    }
  }

  // Remove duplicate entries by using a Set
  // let result = Array.from(new Set(possibleChords));

  return possibleChords;
}

export function identifyChordFrom(chordNotes, bassNote) {
  // notes is an array that is already sorted, the first note in the array is the lowest note.
  // derive the interval numbers from the notes array.
  // determine the chord type/quality, using the derived intervals

  let chord = {
    symbol: getChordSymbol(notes),
    notes,
    intervals: getChordIntervals(notes),
  };

  return chord;
}
