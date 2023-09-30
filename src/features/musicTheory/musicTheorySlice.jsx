import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: "C",
  selectedNotes: [],
};

const musicTheorySlice = createSlice({
  name: "musicTheory",
  initialState,
  reducers: {
    placeholderaddString(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    placeholdertuneString: {
      prepare(stringNumber, newRootNote) {
        return {
          payload: { stringNumber, newRootNote },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
  },
});

export const { placeholderaddString, placeholdertuneString } =
  musicTheorySlice.actions;

export default musicTheorySlice.reducer;
