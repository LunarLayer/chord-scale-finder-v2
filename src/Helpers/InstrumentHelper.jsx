export function getFretsWithNotes(
  tuning,
  selectedNotes,
  allNotes,
  markNotesSetting
) {
  let fretsWithNotes = [];
  let noteIndexes = [];
  // let notesForFrets = [...allNotes];
  for (let tuningNote of tuning) {
    let noteIndex = allNotes.findIndex(
      (note) =>
        note.note === tuningNote.note &&
        note.octave === tuningNote.octave &&
        note.hasAccidental === tuningNote.hasAccidental
    );
    noteIndexes.push(noteIndex);
  }
  let stringCount = noteIndexes.length;

  for (let i = 0; i < 25; i++) {
    // 25 frets
    let notesForFret = [];
    for (let j = 0; j < stringCount; j++) {
      // j strings
      let allNote = allNotes[noteIndexes[j] + i]; // get note from allNotes
      const selectedIndex = selectedNotes.findIndex(
        (selectedNote) =>
          selectedNote.note === allNote.note &&
          selectedNote.hasAccidental === allNote.hasAccidental &&
          selectedNote.octave === allNote.octave &&
          selectedNote.stringNumber === stringCount - j
      );
      if (
        selectedIndex !== -1 &&
        selectedNotes[selectedIndex].stringNumber === stringCount - j
      ) {
        notesForFret.push(selectedNotes[selectedIndex]);
      } else {
        notesForFret.push(allNotes[noteIndexes[j] + i]);
      }
    }
    fretsWithNotes.push(notesForFret);
  }

  return fretsWithNotes;
}

// function getPianoNotes(lowestNote, highestNote) {}

// let startNoteIndex = allNotes.findIndex(
//   (note) =>
//     note.note === string.root &&
//     note.octave === string.octave &&
//     note.hasAccidental === string.hasAccidental
// );
// return allNotes.slice(startNoteIndex, startNoteIndex + 25);
