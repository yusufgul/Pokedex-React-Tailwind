import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPokemonList } from "../../reducers/pokemonListSlice";
import { setPokemonsLoading } from "../../reducers/isLoadingSlice";

//////////////////////////////////////////////////////////////////
// This component creates a list of pokemons from the fetched data
// and set them to a state to be used in other components.
//////////////////////////////////////////////////////////////////
const PokemonList = () => {
  const dispatch = useDispatch();
  const allowAnimated = useSelector((state) => state.filter.allowAnimated);
  const pokemonData = useSelector((state) => state.pokemonData);

  useEffect(() => {
    if (!pokemonData) {
      return;
    }
    // If data is present, we select the things we want to display to the user and create a list of them
    const pokemonList = pokemonData.map((pokemon) => {
      const types = [
        pokemon.types[0].type.name,
        pokemon.types[1] ? pokemon.types[1]?.type?.name : "",
      ];
      const staticImage = pokemon.sprites.front_default;
      const animatedImage =
        pokemon.sprites.versions["generation-v"]["black-white"].animated
          .front_default;
      return {
        id: pokemon.id,
        name: pokemon.name,
        picture: allowAnimated && animatedImage ? animatedImage : staticImage,
        types: types,
      };
    });

    //If data cahnges or animations are enabled, we recreate the list
    dispatch(setPokemonList(pokemonList));
    dispatch(setPokemonsLoading(false));
  }, [pokemonData, allowAnimated]);

  return null;
};

export default PokemonList;
