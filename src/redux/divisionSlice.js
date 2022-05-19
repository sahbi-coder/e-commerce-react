import { createSlice } from "@reduxjs/toolkit";

export const divisions={
    Male:'men',
    Female:'women'
}

const divisionSlice = createSlice({
  name: "division",
  initialState: {
    division:divisions.Male
  },
  reducers: {
    changeDiv:(state,action)=>{
        state.division = action.payload
    }
   
  },
});
export const { changeDiv} = divisionSlice.actions;

export default divisionSlice.reducer;