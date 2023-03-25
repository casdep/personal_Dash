import { createSlice } from "@reduxjs/toolkit";

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    plannerDialogOpen: "",
    selectedTask: {},
  },
  reducers: {
    plannerDialogOpen: (state, action) => {
      state.plannerDialogOpen = action.payload;
    },
    selectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { plannerDialogOpen, selectedTask } = plannerSlice.actions;

export default plannerSlice.reducer;
