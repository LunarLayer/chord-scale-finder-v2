import { createSlice } from "@reduxjs/toolkit";

import { getWindowWidth } from "../../Helpers/WindowHelper";

import { loginUser } from "../User/UserSlice";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    windowWidth: getWindowWidth(),
    instrumentView: undefined,
    tabMenuSettings: undefined,
    menus: undefined,
  },
  reducers: {
    toggleMenu(state, action) {
      const menu = action.payload;
      state.menus[menu].showing = !state.menus[menu].showing;
    },
    setWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser, (state, action) => {
      const user = action.payload;
      console.log(user);
      state.instrumentView = user.instrumentView;
      state.menus = user.menus;
      state.tabMenuSettings = user.tabMenuSettings;
    });
  },
});

export const selectWindowWidth = (state) => state.ui.windowWidth;

export const {
  toggleMenu,
  setActiveTabForQuickMenu,
  setCurrentViewSection1,
  setCurrentViewSection2,
  setWindowWidth,
} = uiSlice.actions;

export default uiSlice.reducer;
