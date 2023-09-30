import { configureStore } from "@reduxjs/toolkit";

import musicTheoryReducer from "./features/musicTheory/musicTheorySlice";
import fretboardReducer from "./features/fretboard/fretboardSlice";
import uiReducer from "./features/ui/uiSlice";

const store = configureStore({
  reducer: {
    musicTheory: musicTheoryReducer,
    fretboard: fretboardReducer,
    ui: uiReducer,
  },
});
export default store;
