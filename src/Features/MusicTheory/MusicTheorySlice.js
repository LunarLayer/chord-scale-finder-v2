import { createSlice, current } from "@reduxjs/toolkit";
import { loginUser } from "../User/UserSlice";
import { Note } from "tonal";
import {
  clearAllNotes,
  selectNoteOnString,
  deselectNoteOnString,
} from "../Fretboard/FretboardSlice";

function getInitialState() {
  let key = undefined;
  let tuning = undefined;
  let markNotes = undefined;
  let labelNotes = undefined;
  let fretPosition = undefined;
  let selectedNotes = [];
  let highlightedNotes = [];

  return {
    key,
    tuning,
    markNotes,
    labelNotes,
    fretPosition,
    selectedNotes,
    highlightedNotes,
  };
}

const MusicTheorySlice = createSlice({
  name: "musicTheory",
  initialState: getInitialState(),
  reducers: {
    setKey(state, action) {
      state.key = action.payload;
    },
    setMarkNotes(state, action) {
      console.log(action.payload);
      state.markNotes = action.payload;
    },
    setLabelNotes(state, action) {
      state.labelNotes = action.payload;
    },
    setFretPosition(state, action) {
      state.fretPosition = action.payload;
    },
    sethighlightNotes(state, action) {
      state.highlightNotes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser, (state, action) => {
        const user = action.payload;
        state.key = user.settings.key;
        state.tuning = user.settings.tuning;
        state.markNotes = user.settings.markNotes;
        state.labelNotes = user.settings.labelNotes;
        state.fretPosition = user.settings.fretPosition;
        state.highlightNotes = user.settings.highlightNotes;
      })
      .addCase(clearAllNotes, (state, action) => {
        state.selectedNotes = [];
      })
      .addCase(selectNoteOnString, (state, action) => {
        const { note } = action.payload;
        for (let selectedNote of state.selectedNotes) {
          if (note.name === selectedNote.name) return;
        }
        // Create a new Note obj to get rid of previous mutations
        let newNote = Note.get(note.name);
        state.selectedNotes.push(newNote);
      })
      .addCase(deselectNoteOnString, (state, action) => {
        const { note } = action.payload;

        let noteIndex = state.selectedNotes.findIndex(
          (selectedNote) => selectedNote.name === note.name
        );
        state.selectedNotes.splice(noteIndex, 1);
      });
  },
});

export const {
  setKey,
  setMarkNotes,
  setLabelNotes,
  setFretPosition,
  setHighlightNotes,
  selectNote,
} = MusicTheorySlice.actions;

export default MusicTheorySlice.reducer;
