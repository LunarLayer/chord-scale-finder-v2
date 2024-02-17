import { Key, Note, Scale } from "tonal";

/* A guest user will be logged in, in case no user has logged in. 
This guest user will keep track of preferences, projects etc. 
and in case the guest user want's to keep all its settings/work, 
he can create a user that will then be saved in the database as a user. */
export function getGuestUser() {
  let guestUser = {
    username: "Guest",
    key: Key.majorKey("C"),
    scale: "major",
    tonality: "todo",
    accidental: "",
    allNotes: [
      { ...Note.get("C0") },
      { ...Note.get("C#0") },
      { ...Note.get("D0") },
      { ...Note.get("D#0") },
      { ...Note.get("E0") },
      { ...Note.get("F0") },
      { ...Note.get("F#0") },
      { ...Note.get("G0") },
      { ...Note.get("G#0") },
      { ...Note.get("A0") },
      { ...Note.get("A#0") },
      { ...Note.get("B0") },
      { ...Note.get("C1") },
      { ...Note.get("C#1") },
      { ...Note.get("D1") },
      { ...Note.get("D#1") },
      { ...Note.get("E1") },
      { ...Note.get("F1") },
      { ...Note.get("F#1") },
      { ...Note.get("G1") },
      { ...Note.get("G#1") },
      { ...Note.get("A1") },
      { ...Note.get("A#1") },
      { ...Note.get("B1") },
      { ...Note.get("C2") },
      { ...Note.get("C#2") },
      { ...Note.get("D2") },
      { ...Note.get("D#2") },
      { ...Note.get("E2") },
      { ...Note.get("F2") },
      { ...Note.get("F#2") },
      { ...Note.get("G2") },
      { ...Note.get("G#2") },
      { ...Note.get("A2") },
      { ...Note.get("A#2") },
      { ...Note.get("B2") },
      { ...Note.get("C3") },
      { ...Note.get("C#3") },
      { ...Note.get("D3") },
      { ...Note.get("D#3") },
      { ...Note.get("E3") },
      { ...Note.get("F3") },
      { ...Note.get("F#3") },
      { ...Note.get("G3") },
      { ...Note.get("G#3") },
      { ...Note.get("A3") },
      { ...Note.get("A#3") },
      { ...Note.get("B3") },
      { ...Note.get("C4") },
      { ...Note.get("C#4") },
      { ...Note.get("D4") },
      { ...Note.get("D#4") },
      { ...Note.get("E4") },
      { ...Note.get("F4") },
      { ...Note.get("F#4") },
      { ...Note.get("G4") },
      { ...Note.get("G#4") },
      { ...Note.get("A4") },
      { ...Note.get("A#4") },
      { ...Note.get("B4") },
      { ...Note.get("C5") },
      { ...Note.get("C#5") },
      { ...Note.get("D5") },
      { ...Note.get("D#5") },
      { ...Note.get("E5") },
      { ...Note.get("F5") },
      { ...Note.get("F#5") },
      { ...Note.get("G5") },
      { ...Note.get("G#5") },
      { ...Note.get("A5") },
      { ...Note.get("A#5") },
      { ...Note.get("B5") },
      { ...Note.get("C6") },
      { ...Note.get("C#6") },
      { ...Note.get("D6") },
      { ...Note.get("D#6") },
      { ...Note.get("E6") },
      { ...Note.get("F6") },
      { ...Note.get("F#6") },
      { ...Note.get("G6") },
      { ...Note.get("G#6") },
      { ...Note.get("A6") },
      { ...Note.get("A#6") },
      { ...Note.get("B6") },
      { ...Note.get("C7") },
      { ...Note.get("C#7") },
      { ...Note.get("D7") },
      { ...Note.get("D#7") },
      { ...Note.get("E7") },
      { ...Note.get("F7") },
      { ...Note.get("F#7") },
      { ...Note.get("G7") },
      { ...Note.get("G#7") },
      { ...Note.get("A7") },
      { ...Note.get("A#7") },
      { ...Note.get("B7") },
      { ...Note.get("C8") },
      { ...Note.get("C#8") },
      { ...Note.get("D8") },
      { ...Note.get("D#8") },
      { ...Note.get("E8") },
      { ...Note.get("F8") },
      { ...Note.get("F#8") },
      { ...Note.get("G8") },
      { ...Note.get("G#8") },
      { ...Note.get("A8") },
      { ...Note.get("A#8") },
      { ...Note.get("B8") },
    ],
    instrument: "Fretboard",
    nutIsFixed: false,
    soundFile: "jazzBass.mp3",
    instrumentStyle: "default",
    instrumentTheme: "default",
    coloredNotes: false,
    tuning: [Note.get("G2"), Note.get("D2"), Note.get("A1"), Note.get("E1")],
    markNotes: "single",
    labelNotes: "note",
    fretPosition: "all",
    highlightNotes: undefined,
    assumePerfectFifth: false,
    menus: {
      keyChange: { id: "KeyChangeMenu", showing: false },
      instrument: { id: "InstrumentMenu", showing: false },
      settings: { id: "SettingsMenu", showing: false },
    },
    projects: [
      {
        title: "dance with the devil in Am",
        key: undefined,
        tonality: undefined,
        accidental: undefined,
        instrument: undefined,
        instrumentSound: undefined,
        instrumentVariant: undefined,
        theme: undefined,
        coloredNotes: undefined,
        tuning: undefined,
        keyChangeMenu: { showing: false },
        fretboardMenu: { showing: false },
        settingsMenu: { showing: false },
        soundPlayerMenu: { showing: false },
      },
    ],
  };

  // add some variables to the note objects so they can keep track of being selected,
  // highlighted, selected on certain strings,
  // and which strings they belong to on the fretboard in case the fretboard is being used.
  for (let note of guestUser.allNotes) {
    note.selected = false;
    note.selectedOnStrings = [];
    note.highlighted = false;
    note.highlightedOnStrings = [];
    note.appearsOnStrings = [];
  }

  return guestUser;
}
