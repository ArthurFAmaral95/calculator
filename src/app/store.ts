import { configureStore } from "@reduxjs/toolkit"
import calculateReducer from "../features/calculate/calculateSlice"

export const store = configureStore({
  reducer: {
    calculations: calculateReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
