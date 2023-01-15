import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPokemonPerPage } from "../../reducers/pageSlice";
import { setCurrentPage } from "../../reducers/pageSlice";
import { setLastPage } from "../../reducers/pageSlice";
import { setWidth } from "../../reducers/pageSlice";
import FilterPokemonList from "../utility/FilterPokemonList";
import SortPokemons from "../utility/SortPokemons";
import Debounce from "../utility/Debounce";
import PokemonCard from "./PokemonCard";

/////////////////////////////////////////////////////////////////////
// This component places pokemon cards on the page. Filtering and
// sorting functions are called in this component. Pagination related
// operations are also handled in this component.
/////////////////////////////////////////////////////////////////////
const PokemonListContainer = ({ pokemons }) => {
  const dispatch = useDispatch();
  const { pokemonPerPage, width, currentPage } = useSelector(
    (state) => state.page
  );
  const { sort, pokeName, type } = useSelector((state) => state.filter);

  const filteredPokemonList = FilterPokemonList(pokemons, pokeName, type);

  const filteredAndSortedPokemonList = SortPokemons(
    filteredPokemonList,
    sort[1],
    sort[0]
  );

  //Calculate the total number of pages
  const numPages = Math.ceil(
    filteredAndSortedPokemonList.length / pokemonPerPage
  );

  //Divide the pokemon list into blocks according to the number of pokemon that will be displayed to each page
  const pokemonBlocks = [];
  for (let i = 0; i < numPages; i++) {
    const startIndex = i * pokemonPerPage;
    const endIndex = startIndex + pokemonPerPage;
    pokemonBlocks.push(
      filteredAndSortedPokemonList.slice(startIndex, endIndex)
    );
  }

  useEffect(() => {
    const handleResize = Debounce(
      () => dispatch(setWidth(window.innerWidth)),
      250
    );
    window.addEventListener("resize", handleResize);
    if (width >= 366 && width < 596) dispatch(setPokemonPerPage(26));
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // If no pokemon is found, set last page to 1
  useEffect(() => {
    if (filteredAndSortedPokemonList.length === 0) {
      dispatch(setLastPage(1));
    } else {
      dispatch(setLastPage(pokemonBlocks.length));
    }
  }, [filteredAndSortedPokemonList]);

  // Monitor the width of the page and change the displayed pokemon number per page.
  // This is intended to fill the gaps between pokemons that occurs when resizing the page.
  // This code tries to balance pokemon number per page around 27 because if we just try to ..
  // .. fill the blank area with pokemons, small screens will display very little number of pokemon.
  // And 27 is a nice number of pokemon that can be displayed in one page.
  useEffect(() => {
    const maxFit = Math.floor(width / 200 - 0.03);
    if (maxFit >= 2 && pokemonPerPage % maxFit !== 0) {
      if (pokemonPerPage >= 27) {
        dispatch(setPokemonPerPage(pokemonPerPage - (pokemonPerPage % maxFit)));
      } else if (pokemonPerPage < 27) {
        dispatch(
          setPokemonPerPage(
            pokemonPerPage + (maxFit - (pokemonPerPage % maxFit))
          )
        );
      }
    }
  }, [width]);

  //If no pokemon can be found, then display the message
  if (filteredAndSortedPokemonList.length === 0) {
    return (
      <div className="flex justify-center items-center bg-white border-2 border-black w-1/3">
        No pokemon found.
      </div>
    );
    // If the current page number exceeds the available page number, set it to the last page
    // This can happen when resizing the page. Total page numbers could get recalculated and ..
    // the current page number would be out of the range of pages. It causes an Error to be thrown.
  } else if (!pokemonBlocks[currentPage - 1]) {
    dispatch(setCurrentPage(numPages)); //last page could also be used
  } else {
    return (
      <ul className="flex flex-wrap gap-5 m-2 place-content-center">
        {pokemonBlocks[currentPage - 1].map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            picture={pokemon.picture}
            types={pokemon.types}
          />
        ))}
      </ul>
    );
  }
};
export default PokemonListContainer;
