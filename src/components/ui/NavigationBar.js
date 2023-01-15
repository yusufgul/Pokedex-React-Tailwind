import { useSelector, useDispatch } from "react-redux";
import {
  decrementCurrentPage,
  incrementCurrentPage,
  setCurrentPage,
} from "../../reducers/pageSlice";

//////////////////////////////////////////////////
// This component creates a navigation bar at the
// bottom of the page that can be used to navigate
// through pages.
//////////////////////////////////////////////////
function NavigationBar() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.page.currentPage);
  const lastPage = useSelector((state) => state.page.lastPage);
  const options = Array.from({ length: lastPage }, (value, index) => index + 1);

  return (
    <div className="fixed flex flex-row justify-center items-center h-14 w-screen bottom-0 bg-[#9f92ec]">
      {/* Previous page button */}
      <button
        className="navigation-buttons"
        onClick={() => {
          if (currentPage !== 1) {
            dispatch(decrementCurrentPage());
          } else {
            dispatch(setCurrentPage(lastPage));
          }
        }}
      >
        {"⟵"}
      </button>
      {/* Current page number menu */}
      <select
        className="text-center w-14 h-6 text-sm outline-0 focus:border-slate-400 rounded-xl bg-[#f5f3f5]"
        onChange={(e) => dispatch(setCurrentPage(parseInt(e.target.value, 10)))}
        value={currentPage}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* Next page button */}
      <button
        className="navigation-buttons"
        onClick={() => {
          if (currentPage !== lastPage) {
            dispatch(incrementCurrentPage());
          } else {
            dispatch(setCurrentPage(1));
          }
        }}
      >
        {"⟶"}
      </button>
    </div>
  );
}

export default NavigationBar;
