import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slicers/generalSlice";
import plannerSlice from "./slicers/plannerSlice";

export default configureStore({
  reducer: {
    general: generalSlice,
    planner: plannerSlice,
  },
});
