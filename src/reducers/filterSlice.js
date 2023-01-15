import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    sort: "+i",
    type: null,
    pokeName: "",
    allowAnimated: false,
  },
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setPokeName: (state, action) => {
      state.pokeName = action.payload;
    },
    setAllowAnimated: (state, action) => {
      state.allowAnimated = action.payload;
    },
  },
});

export const { setSort, setType, setPokeName, setAllowAnimated } =
  filterSlice.actions;
export default filterSlice;
