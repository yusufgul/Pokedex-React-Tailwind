import FetchPokemonData from "./FetchPokemonData";
import PokemonList from "../pokemons/PokemonList";

//////////////////////////////////////////////////////////////////////////
// This component calls two other components that one of them fetches data
// about pokemons and other creates a list of pokemons and set them to a
// state to be used later.
//////////////////////////////////////////////////////////////////////////
const PokemonDataRequest = () => {
  FetchPokemonData();
  PokemonList();
};

export default PokemonDataRequest;
