import { Note } from "tonal";

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

export function getNoteLabel(pitchClass, labelNotes, key, accidental) {
  let scale = key.type === "minor" ? key.natural.scale : key.scale;
  console.log("scale: " + scale);

  if (labelNotes === "note") {
    for (let scaleNote of scale) {
      if (Note.enharmonic(scaleNote) === pitchClass) {
        console.log("scaleNote: " + scaleNote);
        if (scaleNote.includes("b")) return scaleNote.replace(/b/g, "♭");
        if (scaleNote.includes("#")) return scaleNote.replace(/#/g, "♯");
        return scaleNote;
      }
    }

    if (accidental === "b") {
      return Note.enharmonic(pitchClass).replace(/b/g, "♭");
    } else {
      return pitchClass.replace(/#/g, "♯");
    }

    // if (note.includes("b")) return note.replace("b", "♭");
    // if (note.includes("#")) return note.replace("#", "♯");
    // return note;
  }
  if (labelNotes === "degree") {
    for (let i = 0; i < scale.length; i++) {
      if (pitchClass === scale[i]) {
        return i + 1;
      }
    }
  } else if (labelNotes === "interval") {
    for (let i = 0; i < scale.length; i++) {
      if (pitchClass === scale[i]) {
        return key.intervals[i];
      }
    }
  } else if (labelNotes === "doReMi") {
    for (let i = 0; i < scale.length; i++) {
      if (pitchClass === key.scale[i]) {
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
