import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setShowForm,
  setShowMenu,
  selectIsLoggedIn,
} from "../../reducers/authStateSlice";
import HamburgerMenu from "./HamburgerMenu";
import logoPokedex from "../../images/pokedex.png";
import logoPokeballs from "../../images/pokeball4-1.png";

////////////////////////////////////////////////////
// This component creates a header bar that contains
// two logos and hamburger menu button. Pokedex logo
// can be used to navigate to the main page.
////////////////////////////////////////////////////
const HeaderBar = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(setShowForm(true));
    } else {
      dispatch(setShowMenu(!authState.showMenu));
    }
  };

  return (
    <div className="relative flex items-center pl-4 border-b-2 border-black bg-[#9f92ec]">
      <Link to="/">
        <img
          src={logoPokedex}
          alt="Pokedex logo"
          className="h-16 m-auto md:m-0"
        />
      </Link>
      <img
        src={logoPokeballs}
        alt="Pokeball logo"
        className="absolute left-1/2 top-0 -translate-x-1/2 h-16 hidden md:block"
      />

      <button
        className="absolute right-[15px] px-1 w-[50px] h-[25px] border-2 border-violet-900 bg-[#d1d1f7] 
        active:translate-y-[3px] active:shadow-[inset_0_0_8px_rgba(0,0,0,0.3)] rounded-md text-sm"
        onClick={() => {
          handleClick();
        }}
      >
        {isLoggedIn ? (
          <i
            className="fa fa-bars pt-[2px] text-violet-900"
            aria-hidden="true"
          ></i>
        ) : (
          "login"
        )}
      </button>
      {authState.showMenu && <HamburgerMenu />}
    </div>
  );
};

export default HeaderBar;
