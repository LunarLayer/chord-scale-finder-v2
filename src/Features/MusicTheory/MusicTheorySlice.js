import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: { note: "c", accidental: "" },
  tonalityType: "major", // Minor
  accidentalType: "#", // "b"
  selectedNotes: [],
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
    toggleNoteSelected: {
      prepare(note, hasAccidental, octave, selected) {
        return {
          payload: { note, hasAccidental, octave, selected },
        };
      },

      reducer(state, action) {
        const { note, hasAccidental, octave, selected } = action.payload;
        // let note = {
        //   note,
        //   hasAccidental,
        //   octave,
        //   selected,
        // };
      },
    },
  },
});

export const selectAllNotes = (state) => state.musicTheory.allNotes;
export const {
  toggleNoteSelected,
  toggleAccidentalType,
  toggleTonalityType,
  setKey,
} = MusicTheorySlice.actions;

export default MusicTheorySlice.reducer;
