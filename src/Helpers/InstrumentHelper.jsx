export function getFretsWithNotes(tuning, allNotes) {
  let noteIndex;
  let noteIndexes = [];
  let fretsWithNotes = [];
  let stringCount = tuning.length;

  for (let tuningNote of tuning) {
    noteIndex = allNotes.findIndex((note) => note === tuningNote);
    noteIndexes.push(noteIndex);
  }

  for (let i = 0; i < 25; i++) {
    let fretNotes = [];
    for (let string = 0; string < stringCount; string++) {
      fretNotes.push(allNotes[noteIndexes[string] + i]);
    }
    fretsWithNotes.push(fretNotes);
  }

  return fretsWithNotes;
}

export function getNoteLabel(pitchClass, labelNotes, scale, intervals) {
  // console.log(pitchClass + labelNotes + scale + intervals);
  if (labelNotes === "Note") return pitchClass;
  if (labelNotes === "Degree") {
    for (let i = 0; i < scale.length; i++) {
      if (pitchClass === scale[i]) {
        return i + 1;
      }
    }
  } else if (labelNotes === "Interval") {
    for (let i = 0; i < scale.length; i++) {
      if (pitchClass === scale[i]) {
        return intervals[i];
      }
    }
  } else if (labelNotes === "DoReMi") {
    for (let i = 0; i < scale.length; i++) {
      if (pitchClass === scale[i]) {
        if (i === 0) return "Do";
        if (i === 1) return "Re";
        if (i === 2) return "Mi";
        if (i === 3) return "Fa";
        if (i === 4) return "So";
        if (i === 5) return "La";
        if (i === 6) return "Ti";
      }
    }
  }

  return pitchClass;
}
