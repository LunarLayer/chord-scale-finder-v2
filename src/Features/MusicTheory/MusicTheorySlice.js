import { createSlice, current } from "@reduxjs/toolkit";
import { loginUser } from "../User/UserSlice";
import { Note } from "tonal";
import {
  clearAllNotes,
  selectNoteOnString,
  deselectNoteOnString,
} from "../Fretboard/FretboardSlice";

const MusicTheorySlice = createSlice({
  name: "musicTheory",
  initialState: {
    key: undefined,
    allNotes: [],
    markNotesSetting: undefined,
    labelNotesSetting: undefined,
    fretPositionSetting: undefined,
    highlightNotesSetting: undefined,
  },
  reducers: {
    setKey(state, action) {
      state.key = action.payload;
    },
    setMarkNotesSetting(state, action) {
      state.markNotesSetting = action.payload;
    },
    setLabelNotesSetting(state, action) {
      state.labelNotesSetting = action.payload;
    },
    setFretPositionSetting(state, action) {
      state.fretPositionSetting = action.payload;
    },
    setHighlightNotesSetting(state, action) {
      state.highlightNotesSetting = action.payload;
    },
    toggleNoteSelected(state, action) {
      // This needs adjustment, but i need to know which other strings it appears on.
      const { note, stringNumber, wasSelected } = action.payload;

      let noteIndex = state.allNotes.findIndex(
        (allNote) => allNote.name === note.name
      );

      if (wasSelected) {
        switch (state.markNotesSetting) {
          case "Single":
            state.allNotes[noteIndex].onlySelectedOnStrings = state.allNotes[
              noteIndex
            ].onlySelectedOnStrings.filter(
              (number) => number !== parseInt(stringNumber)
            );
            if (state.allNotes[noteIndex].onlySelectedOnStrings.length >= 1) {
              state.allNotes[noteIndex].selected = true;
            } else {
              state.allNotes[noteIndex].selected = false;
            }
            console.log(
              "after removal: " +
                state.allNotes[noteIndex].onlySelectedOnStrings
            );
            break;
          case "Identical":
            state.allNotes[noteIndex].onlySelectedOnStrings = [];
            state.allNotes[noteIndex].selected = false;
            break;
          case "All":
            for (let octave = 0; octave < 8; octave++) {
              noteIndex = state.allNotes.findIndex(
                (allNote) => allNote.name === note.pc + octave
              );
              state.allNotes[noteIndex].selected = false;
            }
            break;
          default:
            state.allNotes[noteIndex].selected = true;
        }
      } else {
        switch (state.markNotesSetting) {
          case "Single":
            state.allNotes[noteIndex].selected = true;
            state.allNotes[noteIndex].onlySelectedOnStrings.push(
              parseInt(stringNumber)
            );
            console.log(
              "after adding: " + state.allNotes[noteIndex].onlySelectedOnStrings
            );
            break;
          case "Idential":
            state.allNotes[noteIndex].onlySelectedOnStrings = [];
            state.allNotes[noteIndex].selected = true;
            break;
          case "All":
            for (let octave = 0; octave < 8; octave++) {
              noteIndex = state.allNotes.findIndex(
                (allNote) => allNote.name === note.pc + octave
              );
              state.allNotes[noteIndex].selected = true;
            }
            break;
          default:
            state.allNotes[noteIndex].selected = true;
        }
      }

      /* 
        Single:
        note.selected = true;
        note.selectedOnlyOnStrings.push(stringNumber);
      
      
      
      */
    },
    deselectNote(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser, (state, action) => {
        const user = action.payload;
        state.key = user.settings.key;
        state.allNotes = user.settings.allNotes;
        state.markNotesSetting = user.settings.markNotesSetting;
        state.labelNotesSetting = user.settings.labelNotesSetting;
        state.fretPositionSetting = user.settings.fretPositionSetting;
        state.highlightNotesSetting = user.settings.highlightNotesSetting;
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
  setMarkNotesSetting,
  setLabelNotesSetting,
  setFretPositionSetting,
  setHighlightNotesSetting,
  toggleNoteSelected,
} = MusicTheorySlice.actions;

export default MusicTheorySlice.reducer;
