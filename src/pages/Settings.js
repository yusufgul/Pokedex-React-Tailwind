import { Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthFunctions from "../components/auth/AuthFunctions";
import MessageDisplay from "../components/ui/MessageDisplay";
import ProfilePageLinks from "../components/ui/ProfilePageLinks";

//////////////////////////////////////////////////////////////////////////
// Component that displays the available settings related to users account
//////////////////////////////////////////////////////////////////////////
const Settings = () => {
  const dispatch = useDispatch();
  const newEmailRef = useRef();
  const newPasswordRef = useRef();
  const deleteAccountRef = useRef();
  const deleteFavoritesRef = useRef();
  const message = useSelector((state) => state.message);

  const passwordHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;
    const authFunctions = await AuthFunctions({
      dispatch,
      enteredNewPassword,
    });
    const { resetPassword } = authFunctions;
    //validation can be done here, tho I wont do it
    resetPassword();
    newPasswordRef.current.value = "";
  };

  const emailHandler = async (event) => {
    event.preventDefault();
    const enteredNewEmail = newEmailRef.current.value;
    const authFunctions = await AuthFunctions({
      dispatch,
      enteredNewEmail,
    });
    const { resetEmail } = authFunctions;
    //validation can be done here, tho I wont do it
    resetEmail();
    newEmailRef.current.value = "";
  };

  const deleteFavoritesHandler = async (event) => {
    event.preventDefault();
    const confirmation = deleteFavoritesRef.current.value;
    const authFunctions = await AuthFunctions({
      dispatch,
      confirmation,
    });
    const { deleteFavorites } = authFunctions;
    deleteFavorites();
    deleteFavoritesRef.current.value = "";
  };

  const deleteAccountHandler = async (event) => {
    event.preventDefault();
    const confirmation = deleteAccountRef.current.value;
    const authFunctions = await AuthFunctions({
      dispatch,
      confirmation,
    });
    const { deleteAccount } = authFunctions;
    deleteAccount();
    deleteAccountRef.current.value = "";
  };

  return (
    <Fragment>
      <ProfilePageLinks />
      {message.show && <MessageDisplay />}
      <div className="grid grid-cols-2 max-[690px]:grid-cols-1 rounded-xl gap-5 p-10 ">
        {/* //////////////////// */}
        {/* Change Password Form */}
        {/* //////////////////// */}
        <form onSubmit={passwordHandler}>
          <div
            className="flex flex-col justify-center items-center font-medium bg-[#9f92ec] 
          rounded-xl gap-5 p-5 h-full w-full border-2 border-gray-600"
          >
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              className="rounded-xl px-2 focus:outline-none"
              ref={newPasswordRef}
            />
            <button className="bg-[#3e4684] px-3 py-1 rounded-xl font-medium text-white">
              Change Password
            </button>
          </div>
        </form>
        {/* ///////////////// */}
        {/* Change Email Form */}
        {/* ///////////////// */}
        <form onSubmit={emailHandler}>
          <div
            className="flex flex-col justify-center items-center font-medium bg-[#9f92ec] 
          rounded-xl gap-5 p-5 h-full w-full border-2 border-gray-600"
          >
            <label htmlFor="new-email">New Email:</label>
            <input
              type="email"
              id="new-email"
              className="rounded-xl px-2 focus:outline-none"
              ref={newEmailRef}
            />
            <button className="bg-[#3e4684] px-3 py-1 rounded-xl font-medium text-white">
              Change Email
            </button>
          </div>
        </form>
        {/* ///////////////////////////// */}
        {/* Delete favorite pokemons form */}
        {/* ///////////////////////////// */}
        <form onSubmit={deleteFavoritesHandler}>
          <div
            className="flex flex-col justify-center items-center font-medium bg-[#9f92ec] 
          rounded-xl gap-5 p-5 h-full w-full border-2 border-gray-600"
          >
            <div className="flex flex-col">
              <label htmlFor="delete-favorites">
                Enter "delete" to delete favorite pokemons:
              </label>
              <label className="text-[12px]">
                note that you cannot undo deleting
              </label>
            </div>
            <input
              type="text"
              id="delete-favorites"
              className="rounded-xl text-center"
              ref={deleteFavoritesRef}
              placeholder="delete"
            />
            <button className="bg-red-600 px-3 py-1 rounded-xl font-medium text-white">
              Delete
            </button>
          </div>
        </form>
        {/* /////////////////// */}
        {/* Delete Account Form */}
        {/* /////////////////// */}
        <form onSubmit={deleteAccountHandler}>
          <div
            className="flex flex-col justify-center items-center font-medium bg-[#9f92ec] 
          rounded-xl gap-5 p-5 h-full w-full border-2 border-gray-600"
          >
            <div className="flex flex-col">
              <label htmlFor="delete-account">
                Enter "delete" to delete account:
              </label>
              <label className="text-[12px]">
                note that you cannot undo deleting
              </label>
            </div>
            <input
              type="text"
              id="delete-account"
              className="rounded-xl text-center"
              ref={deleteAccountRef}
              placeholder="delete"
            />
            <button className="bg-red-600 px-3 py-1 rounded-xl font-medium text-white">
              Delete
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Settings;
