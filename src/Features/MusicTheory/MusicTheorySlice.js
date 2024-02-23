import { createSlice, current } from "@reduxjs/toolkit";
import { loginUser } from "../User/UserSlice";
import { Chord, Note, Scale } from "tonal";

const MusicTheorySlice = createSlice({
  name: "musicTheory",
  initialState: {
    key: undefined,
    scale: undefined,
    accidental: undefined,
    allNotes: [],
    markNotes: undefined,
    labelNotes: undefined,
    fretPosition: undefined,
    highlightNotes: undefined,
    assumePerfectFifth: undefined,
  },
  reducers: {
    toggleAssumePerfectFifth(state) {
      state.assumePerfectFifth = !state.assumePerfectFifth;
    },
    deselectNotes(state, action) {
      if (action.payload === "all") {
        for (let i = 0; i < state.allNotes.length; i++) {
          state.allNotes[i].selected = false;
          state.allNotes[i].selectedOnStrings = [];
        }
      }
    },
    highlightNotes(state, action) {
      let notesToHighlight = action.payload;

      // set accidental based/derived from current scale
      // state.accidental = getAccidental(state, notesInScale);

      // Go through all notes. If a note is in the scale,
      // select it. If the note appears on a string on the fretboard,
      // select it on "selectedOnStrings";

      if (notesToHighlight) {
        for (let i = 0; i < state.allNotes.length; i++) {
          for (let note of notesToHighlight) {
            if (
              note === state.allNotes[i].pc ||
              note === Note.enharmonic(state.allNotes[i].pc) ||
              Note.enharmonic(note) === state.allNotes[i].pc
            ) {
              state.allNotes[i].highlighted = true;
              break;
            } else {
              state.allNotes[i].highlighted = false;
            }
          }
        }
      } else {
        for (let i = 0; i < state.allNotes.length; i++) {
          state.allNotes[i].highlighted = false;
        }
      }
    },
    selectNotesInKey(state, action) {
      // get notes in the scale of the key
      let notesInScale =
        state.key.type === "minor" ? state.key.natural.scale : state.key.scale;

      // set accidental based/derived from current scale
      state.accidental = getAccidental(state, notesInScale);

      // Go through all notes. If a note is in the scale,
      // select it. If the note appears on a string on the fretboard,
      // select it on "selectedOnStrings";
      for (let i = 0; i < state.allNotes.length; i++) {
        for (let note of notesInScale) {
          if (
            note === state.allNotes[i].pc ||
            note === Note.enharmonic(state.allNotes[i].pc) ||
            Note.enharmonic(note) === state.allNotes[i].pc
          ) {
            state.allNotes[i].selected = true;
            if (state.allNotes[i].appearsOnStrings.length > 0) {
              state.allNotes[i].selectedOnStrings =
                state.allNotes[i].appearsOnStrings;
            }
            break;
          } else {
            state.allNotes[i].selected = false;
            state.allNotes[i].selectedOnStrings = [];
          }
        }
      }
    },
    setKey(state, action) {
      state.key = action.payload;
    },
    setAccidental(state, action) {
      state.accidental = action.payload;
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
    builder.addCase(loginUser, (state, action) => {
      const user = action.payload;
      state.key = user.key;
      state.scale = user.scale;
      state.allNotes = user.allNotes;
      state.accidental = user.accidental;
      state.assumePerfectFifth = user.assumePerfectFifth;
      state.markNotes = user.markNotes;
      state.labelNotes = user.labelNotes;
      state.fretPosition = user.fretPosition;
      state.highlightNotes = user.highlightNotes;
      if (user.instrumentView.activeInstrument === "fretboard") {
        let tuning = user.tuning;

        for (let i = 0; i < tuning.length; i++) {
          let rootNote = tuning[i].name;
          let rootIndex = state.allNotes.findIndex(
            (note) => note.name === rootNote
          );
          for (let j = 0; j <= 24; j++) {
            state.allNotes[rootIndex + j].appearsOnStrings.push(
              tuning.length - i
            );
          }
        }
      }
    });
  },
});

function getAccidental(state, notesInScale) {
  for (let note of notesInScale) {
    if (note.includes("b")) return "b";
    if (note.includes("#")) return "#";
  }
  // If no flats or sharps are found, default to using sharps
  return "#";
}

export const {
  deselectNotes,
  highlightNotes,
  selectNotesInKey,
  setKey,
  setAccidental,
  setMarkNotes,
  setLabelNotes,
  setFretPosition,
  setHighlightNotes,
  toggleAssumePerfectFifth,
  toggleNoteSelected,
} = MusicTheorySlice.actions;

export default MusicTheorySlice.reducer;
