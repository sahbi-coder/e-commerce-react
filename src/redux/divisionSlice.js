import { createSlice } from "@reduxjs/toolkit";

export const divisions={
    Male:'men',
    Female:'women',
    Both:'man and female'
}

const divisionSlice = createSlice({
  name: "division",
  initialState: {
    division:divisions.Both
  },
  reducers: {
    changeDiv:(state,action)=>{
        state.division = action.payload
    }
   
  },
});
export const { changeDiv} = divisionSlice.actions;

export default divisionSlice.reducer;