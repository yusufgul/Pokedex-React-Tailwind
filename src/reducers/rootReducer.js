import { combineReducers } from "redux";
import pokemonListSlice from "./pokemonListSlice";
import isLoadingSlice from "./isLoadingSlice";
import pokemonDataSlice from "./pokemonDataSlice";
import detailCardSlice from "./detailCardSlice";
import authStateSlice from "./authStateSlice";
import messageSlice from "./messageSlice";
import favoritePokemonsSlice from "./favoritePokemonsSlice";
import filterSlice from "./filterSlice";
import pageSlice from "./pageSlice";

const rootReducer = combineReducers({
  pokemonList: pokemonListSlice.reducer,
  isLoading: isLoadingSlice.reducer,
  pokemonData: pokemonDataSlice.reducer,
  detailCard: detailCardSlice.reducer,
  authState: authStateSlice.reducer,
  message: messageSlice.reducer,
  favoritePokemons: favoritePokemonsSlice.reducer,
  filter: filterSlice.reducer,
  page: pageSlice.reducer,
});

export default rootReducer;
