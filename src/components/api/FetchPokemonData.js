import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPokemonsLoading } from "../../reducers/isLoadingSlice";
import { setMessage } from "../../reducers/messageSlice";
import { setPokemonData } from "../../reducers/pokemonDataSlice";

//////////////////////////////////////////////////////////////////////////
// This component fetches general data about pokemons when called.
// It selects some info specially from the coming data and set them to the
// pokemonData state to let them be used later.
//////////////////////////////////////////////////////////////////////////
const FetchPokemonData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setPokemonsLoading(true));
      try {
        //Fetch general data for all the pokemons
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=890"
        );
        const data = await response.json();

        // Collect pokemon urls for fetching more information
        const pokemonUrls = data.results.map(
          (pokemon) => `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );

        const pokemonPromises = pokemonUrls.map(async (url) => {
          const response = await fetch(url);
          const data = await response.json();
          return data;
        });

        const pokemonData = await Promise.all(pokemonPromises);

        dispatch(setPokemonData(pokemonData));
      } catch (error) {
        dispatch(setPokemonsLoading(false));
        dispatch(
          setMessage({
            show: true,
            header: "ERROR",
            body: error.message,
            color: "Crimson",
          })
        );
      }
    };
    fetchData();
  }, []);

  return null;
};

export default FetchPokemonData;
