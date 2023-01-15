import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsLogin, setShowForm } from "../../reducers/authStateSlice";
import { setAuthLoading } from "../../reducers/isLoadingSlice";
import { selectIsLoggedIn } from "../../reducers/authStateSlice";
import AuthFunctions from "./AuthFunctions";
import Backdrop from "../ui/Backdrop";
import CloseButton from "../ui/CloseButton";
import pokeball from "../../images/pokeball2.png";

//////////////////////////////////////////////////////////////////////////
// This component creates a interface for users to access sign up and
// login operations with it. Interface also handles form submits and sends
// obtained data to necessary components or functions.
//////////////////////////////////////////////////////////////////////////
const AuthForm = () => {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const isLoading = useSelector((state) => state.isLoading);
  const authState = useSelector((state) => state.authState);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //Get signup and login functions from AuthFunctions component
    const authFunctions = await AuthFunctions({
      dispatch,
      enteredEmail,
      enteredPassword,
    });
    const { signUp, logIn } = authFunctions;

    if (authState.isLogin) {
      dispatch(setAuthLoading(true));
      logIn();
    } else {
      dispatch(setAuthLoading(true));
      signUp();
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setShowForm(false));
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Backdrop />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col
    w-[350px] h-3/4 bg-[#f1f7fe] rounded-xl z-[30]"
      >
        <CloseButton onClick={() => dispatch(setShowForm(false))} />

        {/* Pokeball image div */}
        <div className="flex h-[35%] w-full justify-center items-center rounded-t-xl">
          <img
            src={pokeball}
            className="h-[120px] w-[120px]"
            alt="Pokeball pixel logo"
          />
        </div>

        {/* //////////////////////////////////////////////// */}
        {/* input div that contains email and password input */}
        {/* //////////////////////////////////////////////// */}
        <form
          className="flex flex-col h-[45%] w-full justify-center items-center"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col h-[100px] w-[300px] justify-center bg-white rounded-2xl mb-5 pl-4">
            <label htmlFor="email" className="text-md">
              Email Address
            </label>
            <div className="flex items-center">
              <i className="fa fa-envelope mr-2"></i>
              <input
                type="email"
                id="email"
                placeholder="Username@gmail.com"
                className="rounded p-2 w-3/4 text-sm focus:outline-none"
                ref={emailInputRef}
                required
              />
            </div>
          </div>

          <div className="flex flex-col h-[100px] w-[300px] justify-center bg-white rounded-2xl pl-4">
            <label htmlFor="email" className="text-md">
              Password
            </label>
            <div className="flex items-center">
              <i className="fa fa-lock mr-2"></i>
              <input
                type="password"
                id="password"
                placeholder=" ----------"
                className="rounded p-2 w-3/4 text-sm focus:outline-none"
                ref={passwordInputRef}
                required
              />
            </div>
          </div>

          {/* /////////////////////// */}
          {/* login and other buttons */}
          {/* /////////////////////// */}
          {isLoading.auth && (
            <div className="flex justify-center items-center bg-[#3e4684] text-white px-1 h-[50px] w-[300px] rounded-2xl mt-7">
              <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
            </div>
          )}
          {!isLoading.auth && (
            <button
              className="bg-[#3e4684] text-white px-1 h-[50px] w-[300px] rounded-2xl mt-7"
              type="submit"
            >
              {authState.isLogin ? "Login" : "Sign Up"}
            </button>
          )}
        </form>

        <div className="flex flex-col h-[20%] w-full rounded-b-xl">
          <div className="flex flex-row justify-center m-5">
            <button
              className="text-xs"
              onClick={() => {
                dispatch(setIsLogin(!authState.isLogin));
              }}
            >
              {authState.isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
