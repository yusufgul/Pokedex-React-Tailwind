import { createSlice } from "@reduxjs/toolkit";

const pokemonListSlice = createSlice({
  name: "pokemonList",
  initialState: [],
  reducers: {
    setPokemonList: (state, action) => action.payload,
  },
});

export const { setPokemonList } = pokemonListSlice.actions;
export default pokemonListSlice;
