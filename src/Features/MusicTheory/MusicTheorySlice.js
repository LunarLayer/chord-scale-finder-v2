import { createSlice, current } from "@reduxjs/toolkit";
import { loginUser } from "../User/UserSlice";
import { Note, Scale } from "tonal";
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
    markNotes: undefined,
    labelNotes: undefined,
    fretPosition: undefined,
    highlightNotes: undefined,
  },
  reducers: {
    selectNotesInKey(state, action) {
      const key = action.payload;
      console.log(key);
      state.allNotes[0].selected = true;
      // state.allNotes[0].selectedOnStrings.push(5);
      // let notesInKey = Scale.get(key.tonic + " " + key.type).notes;
      // console.log(notesInKey);
      // console.log(current(state.allNotes));
      // for (let allNote of state.allNotes) {
      //   // set allNote.selected if notesInKey.includes(allNote.pc);
      //   let noteIndex = state.allNotes.findIndex(
      //     (note) => note.name === allNote.name
      //   );
      //   console.log(noteIndex);
      //   state.allNotes[noteIndex].selected = true;
      //   state.allNotes[noteIndex].selectedOnStrings.push(5);
      // }
      // if it the note exists on a string on the fretboard
      // if (allNote.appearsOnStrings.length > 0) {
      //   // let noteIndex = state.allNotes.findIndex(
      //   //   (note) => note.name === allNote.name
      //   // );

      //   // select the note on the strings it appears on
      //   for (let stringNumber of state.allNotes[noteIndex].appearsOnStrings) {
      //     state.allNotes[noteIndex].selectedOnStrings.push(stringNumber);
      //     console.log(current(state.allNotes[noteIndex]));
      //   }
      // }

      // if (notesInKey.includes(allNote.pc)) {
      //   console.log("yes includes");
      //   let noteIndex = state.allNotes.findIndex(
      //     (note) => note.pc === allNote.pc
      //   );
      //   console.log("noteIndex: " + noteIndex);
      //   state.allNotes[noteIndex].selected = true;
      //   if (state.allNotes[noteIndex].appearsOnStrings.length > 0) {
      //     state.allNotes[noteIndex].selectedOnStrings = [55];
      //   }
      // }
    },
    setKey(state, action) {
      // Note.enharmonic(note.pc) can be used to convert a flat to a sharp (and maybe the other way too)
      // make sure setting a different key, also results in the correct display of notes on the fretboard
      // double sharps and double flats are possible (fx. key of B#).
      const key = action.payload;
      state.key = key;
      console.log("setKey: " + action.payload.tonic);

      let notesInKey = Scale.get(key.tonic + " " + key.type).notes;
      console.log("notesInKeyz: " + notesInKey);

      // go through all the notes
      for (let i = 0; i < state.allNotes.length; i++) {
        // if the note is in the current key
        if (notesInKey.includes(state.allNotes[i].pc)) {
          // select it on the piano (change "selected" to "selectedOnPiano" later(?))
          state.allNotes[i].selected = true;
          // if the current note that's in the key, is also appearing on a string on the fretboard
          if (state.allNotes[i].appearsOnStrings.length > 0) {
            // select it on the string(s)
            state.allNotes[i].selectedOnStrings =
              state.allNotes[i].appearsOnStrings;
          }
        } else {
          // otherwise, deselect the note. The note may still "appearsOnString",
          // though it won't be selected if it's not in the key
          state.allNotes[i].selected = false;
          state.allNotes[i].selectedOnStrings = [];
        }
      }
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
    setHighlightNotes(state, action) {
      state.highlightNotes = action.payload;
    },
    toggleNoteSelected(state, action) {
      const { note, stringNumber, wasSelected } = action.payload;
      let noteIndex = state.allNotes.findIndex(
        (allNote) => allNote.name === note.name
      );
      let stringNumberIndex = state.allNotes[
        noteIndex
      ].selectedOnStrings.findIndex((num) => num === stringNumber);

      if (wasSelected) {
        switch (state.markNotes) {
          case "single":
            state.allNotes[noteIndex].selectedOnStrings.splice(
              stringNumberIndex,
              1
            );
            // completely deselect if not selected on any string
            if (state.allNotes[noteIndex].selectedOnStrings.length === 0)
              state.allNotes[noteIndex].selected = false;
            break;
          case "identical":
            state.allNotes[noteIndex].selectedOnStrings = [];
            state.allNotes[noteIndex].selected = false;
            break;
          case "all":
            for (let octave = 0; octave < 8; octave++) {
              noteIndex = state.allNotes.findIndex(
                (allNote) => allNote.name === note.pc + octave
              );
              state.allNotes[noteIndex].selectedOnStrings = [];
              state.allNotes[noteIndex].selected = false;
            }
            break;
          default:
            state.allNotes[noteIndex].selected = true;
        }
      } else {
        switch (state.markNotes) {
          case "single":
            console.log("single here");
            state.allNotes[noteIndex].selected = true;
            state.allNotes[noteIndex].selectedOnStrings.push(stringNumber);
            break;
          case "identical":
            state.allNotes[noteIndex].selectedOnStrings = [];
            for (let stringNumber of state.allNotes[noteIndex]
              .appearsOnStrings) {
              state.allNotes[noteIndex].selectedOnStrings.push(stringNumber);
            }
            state.allNotes[noteIndex].selected = true;
            break;
          case "all":
            for (let octave = 0; octave < 8; octave++) {
              noteIndex = state.allNotes.findIndex(
                (allNote) => allNote.name === note.pc + octave
              );
              state.allNotes[noteIndex].selectedOnStrings = [];
              for (let stringNumber of state.allNotes[noteIndex]
                .appearsOnStrings) {
                state.allNotes[noteIndex].selectedOnStrings.push(stringNumber);
              }
              state.allNotes[noteIndex].selected = true;
            }
            break;
        }
      }
    },
    deselectNote(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser, (state, action) => {
        const user = action.payload;
        state.key = user.key;
        state.allNotes = user.allNotes;
        if (user.instrument === "Fretboard") {
          let tuning = user.tuning;
          let notesInKey = Scale.get(
            state.key.tonic + " " + state.key.type
          ).notes;

          for (let i = 0; i < tuning.length; i++) {
            let rootNote = tuning[i].name;
            let rootIndex = state.allNotes.findIndex(
              (note) => note.name === rootNote
            );
            for (let j = 0; j <= 24; j++) {
              state.allNotes[rootIndex + j].appearsOnStrings.push(
                tuning.length - i
              );

              if (notesInKey.includes(state.allNotes[rootIndex + j].pc)) {
                state.allNotes[rootIndex + j].selectedOnStrings.push(
                  tuning.length - i
                );
                state.allNotes[rootIndex + j].selected = true;
              }
            }
          }
        }
        state.markNotes = user.markNotes;
        state.labelNotes = user.labelNotes;
        state.fretPosition = user.fretPosition;
        state.highlightNotes = user.highlightNotes;
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
  selectNotesInKey,
  setKey,
  setMarkNotes,
  setLabelNotes,
  setFretPosition,
  setHighlightNotes,
  toggleNoteSelected,
} = MusicTheorySlice.actions;

export default MusicTheorySlice.reducer;
