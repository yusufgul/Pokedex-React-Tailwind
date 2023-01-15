import Types from "../../constants/Types";
import { setCurrentPage } from "../../reducers/pageSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setAllowAnimated,
  setPokeName,
  setType,
  setSort,
} from "../../reducers/filterSlice";

///////////////////////////////////////////////////////////////////
// This component creates a filter bar that can be hidden and shown
// according to the users will. Filter bar contains several buttons
// and a input field that can be used for filtering pokemons. There
// is also a reset button that nullifies all applied filters.
// There is also a checkbox that can be used to change between
// still and motion images.
///////////////////////////////////////////////////////////////////
const FilterBar = () => {
  const dispatch = useDispatch();
  const types = document.querySelector(".type-rotate");
  const banner = document.querySelector(".banner");
  const toggleElements = document.querySelectorAll(".toggle");
  const filterButton = document.querySelector(".filter-button");
  const { allowAnimated, sort, pokeName, type } = useSelector(
    (state) => state.filter
  );

  // Apply selected type as a filter
  const handleTypeClick = (selectedType) => {
    // If type already selected, remove it
    if (selectedType === type) {
      dispatch(setType(""));
    } else {
      dispatch(setType(selectedType));
      dispatch(setCurrentPage(1));
    }
  };

  const handleToggleHide = () => {
    filterButton.classList.toggle("translate-y-[3px]");
    filterButton.classList.toggle("shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]");
    banner.style.display = banner.style.display === "none" ? "flex" : "none";
    types.style.display = types.style.display === "flex" ? "none" : "flex";

    for (const element of toggleElements) {
      element.style.display =
        element.style.display === "flex" ? "none" : "flex";
    }
  };

  return (
    // Filter dropdown menu button
    <div className="flex justify-center mb-4 bg-[#d1d1f7] p-2 h-10 relative">
      <button
        className="filter-button retro-buttons absolute left-0 w-[50px] ml-2 bg-[#b5a0f3] border-t-[#c8c0f8]
        border-b-[#705898] active:translate-y-[3px] active:shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]"
        onClick={() => handleToggleHide()}
      >
        Filter
      </button>
      {/* Banner */}
      <div
        className="banner flex justify-center w-[250px] rounded-lg text-[15px]  ml-[15px] bg-[#fff7fa]
       text-fuchsia-700"
      >
        {type ? type + " types" : "no type"}
        {allowAnimated ? " / animations selected" : " selected"}
      </div>

      {/* Checkbox for toggling animations */}
      <label className="inline-flex relative items-center cursor-pointer mx-[10px]">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={allowAnimated}
          onChange={(event) => {
            dispatch(setAllowAnimated(!allowAnimated));
          }}
        />
        <div
          className="toggle check-box peer peer-focus:outline-none peer-checked:after:translate-x-full
         peer-checked:after:border-white peer-checked:bg-blue-600 hidden "
          title="Note that not all Pokémon have animated images available!"
        ></div>
        <span
          className="toggle ml-[4px] mr-[15px] max-[500px]:mr-[0px] text-sm font-medium
         dark:text-gray-800 underline decoration-dotted decoration-gray-800 hidden"
          title="Note that not all Pokémon have animated images available!"
        >
          GIF
        </span>
      </label>

      {/* Create filter button for each type */}
      <div className={`type-rotate z-10`}>
        {Types.map((selectedType) => (
          <button
            key={selectedType.name}
            className={`retro-buttons ${selectedType.class} ${
              selectedType.name === type
                ? "translate-y-[3px] shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]"
                : ""
            } w-[50px]`}
            onClick={() => handleTypeClick(selectedType.name)}
          >
            {selectedType.name[0].toUpperCase() +
              selectedType.name.substring(1)}
          </button>
        ))}
      </div>

      {/* Input field */}
      <input
        className="border-2 outline-0 focus:border-slate-400 max-[500px]:w-[100px] 
        px-4 py-2 mx-2 max-[500px]:ml-[0px] toggle rounded-xl text-sm hidden"
        placeholder="--Search--"
        value={pokeName}
        onChange={(event) => {
          dispatch(setPokeName(event.target.value));
          dispatch(setCurrentPage(1));
        }}
      />
      {/* Reset button */}
      <button
        className="retro-buttons toggle justify-center items-center hidden w-[50px]
         bg-red-600 border-t-orange-500 border-b-gray-700 max-[500px]:mr-[30px]"
        onClick={() => {
          dispatch(setPokeName(""));
          dispatch(setType(null));
          dispatch(setCurrentPage(1));
          dispatch(setSort("+i"));
        }}
      >
        Reset
      </button>
      {/* Sorting dropdown menu */}
      <select
        name="sort"
        id="sort"
        className="retro-buttons outline-0 absolute right-0 h-[23px] mr-2 w-[65px] max-[410px]:w-[55px] bg-[#b5a0f3]
         border-t-[#c8c0f8] border-b-[#705898] active:translate-y-[3px] active:shadow-[inset_0_0_8px_rgba(0,0,0,0.4)]"
        onChange={(event) => dispatch(setSort(event.target.value))}
        value={sort}
      >
        <option value="+i">ID ↑</option>
        <option value="-i">ID ↓</option>
        <option value="+n">Name ↑</option>
        <option value="-n">Name ↓</option>
      </select>
    </div>
  );
};

export default FilterBar;
