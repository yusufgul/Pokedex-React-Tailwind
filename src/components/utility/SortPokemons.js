////////////////////////////////////////////////////////////
// A function that sorts pokemons by their name or id number
////////////////////////////////////////////////////////////
const SortPokemons = (pokemons, criteria, order) => {
  // If sorted by name
  if (criteria === "n") {
    if (order === "+") {
      return pokemons.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (order === "-") {
      return pokemons.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
    // If sorted by id
  } else if (criteria === "i") {
    if (order === "+") {
      return pokemons.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else if (order === "-") {
      return pokemons.sort((a, b) => (a.id < b.id ? 1 : -1));
    }
  }
  return pokemons;
};

export default SortPokemons;
