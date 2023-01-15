import { createSlice } from "@reduxjs/toolkit";

const favoritePokemonsSlice = createSlice({
  name: "favoritePokemons",
  initialState: [],
  reducers: {
    setFavoritePokemons: (state, action) => action.payload,
  },
});

export const { setFavoritePokemons } = favoritePokemonsSlice.actions;
export default favoritePokemonsSlice;
