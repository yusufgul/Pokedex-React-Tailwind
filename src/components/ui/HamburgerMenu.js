import { setShowMenu } from "../../reducers/authStateSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import AuthFunctions from "../auth/AuthFunctions";

///////////////////////////////////////////////////////////////////
// This component creates a hamburger menu that can be used to
// navigate between pages after user logged in. If not, it opens
// the authentication menu.
/////////////////////////////////////////////////
const HamburgerMenu = ({ isOpen }) => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const authFunctions = await AuthFunctions({
      dispatch,
    });
    const { logOut } = authFunctions;
    logOut("Logout successfully.", "Green");
  };

  const handleClick = () => {
    dispatch(setShowMenu(false));
  };

  return (
    <div
      className="absolute flex justify-center items-center border-8 border-[#707E9D]
      bg-white right-[14px] top-[46px] z-[29] w-[150px] h-[200px] rounded-lg"
    >
      <nav className={`${isOpen ? "open" : ""}`}>
        <ul className="flex flex-col gap-4 text-[20px] text-[#707E9D]">
          <li>
            <Link to="/" onClick={handleClick}>
              <i className="fa fa-home pr-1" aria-hidden="true"></i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={handleClick}>
              <i className="fa fa-user pr-1" aria-hidden="true"></i>
              Profile
            </Link>
          </li>
          <li>
            <button onClick={logoutHandler}>
              <i className="fa fa-arrow-right pr-1" aria-hidden="true"></i>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default HamburgerMenu;
