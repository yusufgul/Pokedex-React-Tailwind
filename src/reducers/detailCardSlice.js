import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  id: null,
  name: null,
  genera: "",
  generation: "",
  text: "",
  artWork: "",
  firstEvolution: {
    id: null,
    name: null,
  },
  secondEvolution: {
    id: null,
    name: null,
  },
  thirdEvolution: {
    id: null,
    name: null,
  },
};

const detailCardSlice = createSlice({
  name: "detailCard",
  initialState,
  reducers: {
    setDetailCard: (state, action) => {
      state.show = action.payload.show;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    setArtWork: (state, action) => {
      state.artWork = action.payload;
    },
    setGenera: (state, action) => {
      state.genera = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    setFirstEvolution: (state, action) => {
      state.firstEvolution.id = action.payload.id;
      state.firstEvolution.name = action.payload.name;
    },
    setSecondEvolution: (state, action) => {
      state.secondEvolution.id = action.payload.id;
      state.secondEvolution.name = action.payload.name;
    },
    setThirdEvolution: (state, action) => {
      state.thirdEvolution.id = action.payload.id;
      state.thirdEvolution.name = action.payload.name;
    },
    setGeneration: (state, action) => {
      state.generation = action.payload;
    },
    setBackToInitial: (state, action) => {
      return { ...initialState };
    },
  },
});

export const {
  setDetailCard,
  setArtWork,
  setGenera,
  setGeneration,
  setText,
  setFirstEvolution,
  setSecondEvolution,
  setThirdEvolution,
  setBackToInitial,
} = detailCardSlice.actions;
export default detailCardSlice;
