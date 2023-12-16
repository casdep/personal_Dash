import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slicers/generalSlice";
import plannerSlice from "./slicers/plannerSlice";
import noteSlice from "./slicers/noteSlice";

export default configureStore({
  reducer: {
    general: generalSlice,
    planner: plannerSlice,
    note: noteSlice,
  },
});
