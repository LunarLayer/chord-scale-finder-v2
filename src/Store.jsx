import { configureStore } from "@reduxjs/toolkit";
import MusicTheoryReducer from "./Features/MusicTheory/MusicTheorySlice";
import FretboardReducer from "./Features/Fretboard/FretboardSlice";
import PianoReducer from "./Features/Piano/PianoSlice";
import UIReducer from "./Features/UI/UISlice";
import UserReducer from "./Features/User/UserSlice";

const store = configureStore({
  reducer: {
    musicTheory: MusicTheoryReducer,
    fretboard: FretboardReducer,
    piano: PianoReducer,
    ui: UIReducer,
    user: UserReducer,
  },
});
export default store;
