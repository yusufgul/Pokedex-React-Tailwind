import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    currentPage: 1,
    lastPage: null,
    width: window.innerWidth,
    pokemonPerPage: 27,
  },
  reducers: {
    incrementCurrentPage: (state) => {
      state.currentPage += 1;
    },
    decrementCurrentPage: (state) => {
      state.currentPage -= 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setPokemonPerPage: (state, action) => {
      state.pokemonPerPage = action.payload;
    },
  },
});

export const {
  incrementCurrentPage,
  decrementCurrentPage,
  setCurrentPage,
  setLastPage,
  setWidth,
  setPokemonPerPage,
} = pageSlice.actions;
export default pageSlice;
