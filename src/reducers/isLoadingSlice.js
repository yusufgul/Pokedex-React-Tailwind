import { createSlice } from "@reduxjs/toolkit";

const isLoadingSlice = createSlice({
  name: "isLoading",
  initialState: {
    pokemons: false,
    detailedData: false,
    auth: false,
  },
  reducers: {
    setPokemonsLoading: (state, action) => {
      state.pokemons = action.payload;
    },
    setDetailedDataLoading: (state, action) => {
      state.detailedData = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setPokemonsLoading, setDetailedDataLoading, setAuthLoading } =
  isLoadingSlice.actions;
export default isLoadingSlice;
