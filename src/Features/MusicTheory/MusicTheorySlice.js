import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  key: { note: "c", accidental: "" },
  tonalityType: "major", // Minor
  accidentalType: "#", // "b"

  selectedNotes: [],
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
      console.log("toggleAccidentalType: " + state.accidentalType);
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
      let note = { ...action.payload };

      if (note.selected === false) {
        note.selected = true;
        state.selectedNotes = [...state.selectedNotes, note];
      } else {
        let noteIndex = state.selectedNotes.findIndex(
          (noteItem) =>
            noteItem.note === note.note &&
            noteItem.hasAccidental === note.hasAccidental &&
            noteItem.octave === note.octave
        );
        note.selected = false;
        let updatedSelectedNotes = [...state.selectedNotes];
        updatedSelectedNotes[noteIndex] = note;
        state.selectedNotes = [...updatedSelectedNotes];
      }
      // update allNotes
      let noteIndex = state.allNotes.findIndex(
        (noteItem) =>
          noteItem.note === note.note &&
          noteItem.hasAccidental === note.hasAccidental &&
          noteItem.octave === note.octave
      );
      let updatedAllNotes = [...state.allNotes];
      updatedAllNotes[noteIndex] = note;
      state.allNotes = [...updatedAllNotes];
    },
  },
});

export const {
  toggleNoteSelected,
  toggleAccidentalType,
  toggleTonalityType,
  setKey,
} = MusicTheorySlice.actions;

export default MusicTheorySlice.reducer;
