import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/ui/Loading";
import FilterBar from "../components/ui/FilterBar";
import NavigationBar from "../components/ui/NavigationBar";
import ProfilePageLinks from "../components/ui/ProfilePageLinks";
import PokemonDataRequest from "../components/api/PokemonDataRequest";
import PokemonListContainer from "../components/pokemons/PokemonListContainer";

//////////////////////////////////////////////////////
// Component that displays the users favorite pokemons
//////////////////////////////////////////////////////
const FavoritePokemons = () => {
  const pokemonList = useSelector((state) => state.pokemonList);
  const favoritePokemons = useSelector((state) => state.favoritePokemons);
  const isLoading = useSelector((state) => state.isLoading);

  const filteredPokemons = pokemonList.filter((pokemon) =>
    favoritePokemons.includes(pokemon.id)
  );

  return (
    <Fragment>
      <ProfilePageLinks />
      <FilterBar />
      <div className="flex flex-row flex-wrap justify-center items-center mb-14">
        <PokemonDataRequest />
        {isLoading.pokemons ? (
          <Loading />
        ) : (
          <PokemonListContainer pokemons={filteredPokemons} />
        )}
      </div>
      <NavigationBar />
    </Fragment>
  );
};

export default FavoritePokemons;
