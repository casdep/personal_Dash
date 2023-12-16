import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    noteDialogOpen: "",
    selectedNote: {},
  },
  reducers: {
    noteDialogOpen: (state, action) => {
      state.noteDialogOpen = action.payload;
    },
    selectedNote: (state, action) => {
      state.selectedNote = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { noteDialogOpen, selectedNote } = noteSlice.actions;

export default noteSlice.reducer;
