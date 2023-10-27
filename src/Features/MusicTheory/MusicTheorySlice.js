import { createSlice, current } from "@reduxjs/toolkit";
import { loginUser } from "../User/UserSlice";

const initialState = {
  key: { note: "C", accidental: "" },
  tonality: "major", // Minor
  accidental: "#", // "b"
  tuning: undefined,
  selectedNotes: [], // {note, hasAccidental, octave, selected, highlighted}
  // instrument quick settings:
  markNotes: "single", // identical / all
  labelNotes: "note", // Degrees / Intervals / Octaves / DoReMi
  fretPosition: "all", // 1 / 2 / 3 / 4 / 5
  highlightedNotes: "chord", // root / all / triads / Arpeggio / scale degree (1 3 5 7)
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
    setKey(state, action) {
      const { note, accidental } = action.payload;
      state.key.note = note;
      state.key.accidental = accidental;
    },
    setMarkNotes(state, action) {
      state.markNotes = action.payload;
      console.log(action.payload);
    },
    setLabelNotes(state, action) {
      state.labelNotes = action.payload;
    },
    setFretPosition(state, action) {
      state.fretPosition = action.payload;
    },
    setHighlightedNotes(state, action) {
      state.highlightedNotes = action.payload;
    },
    toggleAccidental(state) {
      if (state.accidental === "#") {
        state.accidental = "b";
      } else if (state.accidental === "b") {
        state.accidental = "#";
      }
      if (state.key.accidental) {
        state.key.accidental = state.accidental;
      }
    },
    toggleTonality(state) {
      if (state.tonality === "major") {
        state.tonality = "minor";
      } else if (state.tonality === "minor") {
        state.tonality = "major";
      }
    },
    toggleNoteSelected(state, action) {
      const clickedNote = action.payload;
      if (state.markNotes === "single") {
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

      if (state.markNotes === "identical") {
        const clickedIndex = state.allNotes.findIndex(
          (note) =>
            note.note === clickedNote.note &&
            note.octave === clickedNote.octave &&
            note.hasAccidental === clickedNote.hasAccidental
        );
        state.allNotes[clickedIndex].selected =
          !state.allNotes[clickedIndex].selected;
      }

      if (state.markNotes === "all") {
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
  extraReducers: (builder) => {
    builder.addCase(loginUser, (state, action) => {
      const user = action.payload;
      state.key = user.settings.key;
      state.tuning = user.settings.tuning;
      state.markNotes = user.settings.markNotes;
      state.labelNotes = user.settings.labelNotes;
      state.fretPosition = user.settings.fretPosition;
      state.highlightedNotes = user.settings.highlightedNotes;
    });
  },
});

export const {
  setMarkNotes,
  setLabelNotes,
  setFretPosition,
  setHighlightedNotes,
  toggleNoteSelected,
  toggleNoteSelectedOnString,
  toggleAccidental,
  toggleTonality,
  setKey,
} = MusicTheorySlice.actions;

export default MusicTheorySlice.reducer;
