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
