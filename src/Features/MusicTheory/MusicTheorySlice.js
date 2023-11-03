import { createSlice, current } from "@reduxjs/toolkit";
import { loginUser } from "../User/UserSlice";
import { Note } from "tonal";
import { toggleNoteSelectedOnString } from "../Fretboard/FretboardSlice";

function getInitialState() {
  let key = undefined;
  let tuning = undefined;
  let markNotes = undefined;
  let labelNotes = undefined;
  let fretPosition = undefined;
  let selectedNotes = [];

  return {
    key,
    tuning,
    markNotes,
    labelNotes,
    fretPosition,
    selectedNotes,
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
      .addCase(toggleNoteSelectedOnString, (state, action) => {
        const { note } = action.payload;
        // Create a new Note obj to get rid of previous mutations
        let newNote = Note.get(note.name);

        // set new selected state
        let selected = !note.selected;
        if (selected) {
          state.selectedNotes.push(newNote);
        } else {
          let noteIndex = state.selectedNotes.findIndex(
            (note) => note.name === newNote.name
          );
          state.selectedNotes.splice(noteIndex, 1);
        }

        console.log(current(state.selectedNotes));
        // note.selected doesnt exist!
        // let noteToAdd = Note.get(note.name);
        // state.selectedNotes.push()
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
