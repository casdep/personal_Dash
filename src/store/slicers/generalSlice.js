import { createSlice } from "@reduxjs/toolkit";

const value = ("; " + document.cookie).split(`; theme=`).pop().split(";")[0];

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    appTheme: value,
  },
  reducers: {
    appTheme: (state, action) => {
      state.appTheme = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { appTheme } = generalSlice.actions;

export default generalSlice.reducer;
