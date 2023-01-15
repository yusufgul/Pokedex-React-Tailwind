import { createSlice } from "@reduxjs/toolkit";

const pokemonDataSlice = createSlice({
  name: "pokemonData",
  initialState: null,
  reducers: {
    setPokemonData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPokemonData } = pokemonDataSlice.actions;
export default pokemonDataSlice;
