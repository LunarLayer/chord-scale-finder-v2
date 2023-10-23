import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  key: { note: "c", accidental: "" },
  tonalityType: "major", // Minor
  accidentalType: "#", // "b"
  selectedNotes: [], // {note, hasAccidental, octave, stringNumber, highlighted}
  // markNotesSetting: "single", // similar / all
  markNotesSetting: "single", // single / similar / all
  allNotes: [
    {
      note: "C",
      hasAccidental: false,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: true,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: false,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: true,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "E",
      hasAccidental: false,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: false,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: true,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: false,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: true,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: false,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: true,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "B",
      hasAccidental: false,
      octave: 0,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: false,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: true,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: false,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: true,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "E",
      hasAccidental: false,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: false,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: true,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: false,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: true,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: false,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: true,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "B",
      hasAccidental: false,
      octave: 1,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: false,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: true,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: false,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: true,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "E",
      hasAccidental: false,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: false,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: true,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: false,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: true,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: false,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: true,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "B",
      hasAccidental: false,
      octave: 2,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: false,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: true,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: false,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: true,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "E",
      hasAccidental: false,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: false,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: true,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: false,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: true,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: false,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: true,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "B",
      hasAccidental: false,
      octave: 3,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: false,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: true,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: false,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: true,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "E",
      hasAccidental: false,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: false,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: true,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: false,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: true,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: false,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: true,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "B",
      hasAccidental: false,
      octave: 4,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: false,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: true,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: false,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: true,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "E",
      hasAccidental: false,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: false,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: true,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: false,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: true,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: false,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: true,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "B",
      hasAccidental: false,
      octave: 5,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: false,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: true,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: false,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: true,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "E",
      hasAccidental: false,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: false,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: true,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: false,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: true,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: false,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: true,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "B",
      hasAccidental: false,
      octave: 6,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: false,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: true,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: false,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: true,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "E",
      hasAccidental: false,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: false,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: true,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: false,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: true,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: false,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: true,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "B",
      hasAccidental: false,
      octave: 7,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: false,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "C",
      hasAccidental: true,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: false,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "D",
      hasAccidental: true,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "E",
      hasAccidental: false,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: false,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "F",
      hasAccidental: true,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: false,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "G",
      hasAccidental: true,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: false,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "A",
      hasAccidental: true,
      octave: 8,
      selected: false,
      highlighted: false,
    },
    {
      note: "B",
      hasAccidental: false,
      octave: 8,
      selected: false,
      highlighted: false,
    },
  ],
};

const MusicTheorySlice = createSlice({
  name: "musicTheory",
  initialState,
  reducers: {
    setKey: {
      prepare(note, accidental) {
        return {
          payload: { note, accidental },
        };
      },

      reducer(state, action) {
        const { note, accidental } = action.payload;
        state.key.note = note;
        state.key.accidental = accidental;
      },
    },
    toggleAccidentalType(state) {
      if (state.accidentalType === "#") {
        state.accidentalType = "b";
      } else if (state.accidentalType === "b") {
        state.accidentalType = "#";
      }
      if (state.key.accidental) {
        state.key.accidental = state.accidentalType;
      }
    },
    toggleTonalityType(state) {
      if (state.tonalityType === "major") {
        state.tonalityType = "minor";
      } else if (state.tonalityType === "minor") {
        state.tonalityType = "major";
      }
    },
    toggleNoteSelected(state, action) {
      const clickedNote = action.payload;
      if (state.markNotesSetting === "single") {
        const selectedIndex = state.selectedNotes.findIndex(
          (note) =>
            note.note === clickedNote.note &&
            note.octave === clickedNote.octave &&
            note.hasAccidental === clickedNote.hasAccidental &&
            note.stringNumber === clickedNote.stringNumber
        );
        if (selectedIndex !== -1) {
          state.selectedNotes.splice(selectedIndex, 1);
        } else {
          state.selectedNotes.push(clickedNote);
        }
      }

      if (state.markNotesSetting === "similar") {
        const clickedIndex = state.allNotes.findIndex(
          (note) =>
            note.note === clickedNote.note &&
            note.octave === clickedNote.octave &&
            note.hasAccidental === clickedNote.hasAccidental
        );
        state.allNotes[clickedIndex].selected =
          !state.allNotes[clickedIndex].selected;
      }

      if (state.markNotesSetting === "all") {
        state.allNotes = state.allNotes.map((note) => {
          if (
            note.note === clickedNote.note &&
            note.hasAccidental === clickedNote.hasAccidental
          ) {
            return {
              ...note,
              selected: !note.selected,
            };
          } else {
            return note;
          }
        });
      }
    },
  },
});

export const {
  toggleNoteSelected,
  toggleNoteSelectedOnString,
  toggleAccidentalType,
  toggleTonalityType,
  setKey,
} = MusicTheorySlice.actions;

export default MusicTheorySlice.reducer;
