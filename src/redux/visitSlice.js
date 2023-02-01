import { createSlice } from "@reduxjs/toolkit";

const visitSlice = createSlice({
  name: "visit",
  initialState: {
    visits: 0,
  },
  reducers: {
    incrementVisits: (state, action) => {
      state.visits +=1;
    },
  },
});

export const { incrementVisits } = visitSlice.actions;
export default visitSlice.reducer;
