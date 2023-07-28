import { createSlice } from "@reduxjs/toolkit";

const value = localStorage.getItem("theme");

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    appTheme: value,
  },
  reducers: {
    appTheme: (state, action) => {
      state.appTheme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { appTheme } = generalSlice.actions;

export default generalSlice.reducer;
