/////////////////////////////////////////////////////////////
// A function that filters out pokemons with the users' inputs
/////////////////////////////////////////////////////////////
const FilterPokemonList = (pokemons, filterValue, selectedType) => {
  // Create a new array that contains only unique pokemons and remove the dublicates
  const noDublicate = [...new Map(pokemons.map((p) => [p.id, p])).values()];
  // Apply filters to the list of unique pokemons
  return noDublicate
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    .filter((pokemon) => {
      if (!selectedType) {
        return true;
      }

      return pokemon.types.includes(selectedType);
    });
};
export default FilterPokemonList;
