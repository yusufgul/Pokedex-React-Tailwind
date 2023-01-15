import { Fragment } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/ui/Loading";
import FilterBar from "../components/ui/FilterBar";
import NavigationBar from "../components/ui/NavigationBar";
import PokemonDataRequest from "../components/api/PokemonDataRequest";
import PokemonListContainer from "../components/pokemons/PokemonListContainer";

///////////////////////////////////////////////
// Component that displays the fetched pokemons
///////////////////////////////////////////////
const HomePage = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const pokemonList = useSelector((state) => state.pokemonList);

  return (
    <Fragment>
      <FilterBar />
      <div className="flex flex-row flex-wrap justify-center items-center mb-14">
        <PokemonDataRequest />
        {/* If loading, display the loading icon, else display the pokemons */}
        {isLoading.pokemons ? (
          <Loading />
        ) : (
          <PokemonListContainer pokemons={pokemonList} />
        )}
      </div>
      <NavigationBar />
    </Fragment>
  );
};

export default HomePage;
