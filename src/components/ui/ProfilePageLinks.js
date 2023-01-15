import { Fragment } from "react";
import { Link } from "react-router-dom";

////////////////////////////////////////////////////
// This component creates two buttons for navigating
// through user accessable pages.
////////////////////////////////////////////////////
const ProfilePageLinks = () => {
  return (
    <Fragment>
      <div className="flex flex-row flex-wrap w-full h-[40px] place-content-center text-white font-bold">
        <Link
          className="flex justify-center items-center border-b border-r border-black bg-red-400 w-1/2 h-full"
          to="/profile/favorites"
        >
          Favorites
        </Link>
        <Link
          className="flex justify-center items-center border-b border-black bg-amber-400 w-1/2 h-full"
          to="/profile/settings"
        >
          Settings
        </Link>
      </div>
    </Fragment>
  );
};

export default ProfilePageLinks;
