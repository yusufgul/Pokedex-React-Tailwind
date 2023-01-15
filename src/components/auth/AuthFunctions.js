import { setAuthLoading } from "../../reducers/isLoadingSlice";
import { setToken, setShowMenu } from "../../reducers/authStateSlice";
import { setMessage } from "../../reducers/messageSlice";
import { setFavoritePokemons } from "../../reducers/favoritePokemonsSlice";

import app from "../firebase/FirebaseConfig";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword,
  updateEmail,
  deleteUser,
} from "firebase/auth";
import { getFirestore, deleteDoc, doc } from "firebase/firestore";

const db = getFirestore(app);
const auth = getAuth(app);

let timeoutId;

//////////////////////////////////////////////////////////////////////////
// This component contains necessary functions to handle authentication
// process. Gets data from other components and use them to authenticate
// users. Also exports functions, so they can be used in other components.
//////////////////////////////////////////////////////////////////////////
const AuthFunctions = async ({
  dispatch,
  enteredEmail,
  enteredPassword,
  enteredNewPassword,
  enteredNewEmail,
  confirmation,
}) => {
  const timeoutHandler = () => {
    const storedExpirationTime = localStorage.getItem("expirationTime");
    if (storedExpirationTime) {
      const currentTime = Date.parse(new Date());
      const timeRemaining = storedExpirationTime - currentTime;
      console.log(timeRemaining);
      if (timeRemaining > 0) {
        timeoutId = setTimeout(() => {
          logOut("Token expired. Please login again", "Crimson");
        }, timeRemaining);
      } else {
        logOut("Token expired. Please login again", "Crimson");
      }
    }
  };

  const signUp = async () => {
    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();
        const expirationTime = Date.parse(idTokenResult.expirationTime);
        dispatch(setToken(user.accessToken));
        dispatch(setAuthLoading(false));
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("expirationTime", expirationTime);
        timeoutHandler();
      })
      .catch((error) => {
        dispatch(setAuthLoading(false));
        dispatch(
          setMessage({
            show: true,
            header: "ERROR",
            body: error.message,
            color: "Crimson",
          })
        );
      });
  };

  const logOut = (message, color) => {
    dispatch(setFavoritePokemons([]));
    dispatch(setToken(null));
    dispatch(setShowMenu(false));
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    clearTimeout(timeoutId);

    dispatch(
      setMessage({
        show: true,
        header: "MESSAGE",
        body: message,
        color: color,
      })
    );
  };

  const logIn = async () => {
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const idTokenResult = await user.getIdTokenResult();
        const expirationTime = Date.parse(idTokenResult.expirationTime);
        dispatch(setToken(user.accessToken));
        dispatch(setAuthLoading(false));
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("token", user.accessToken);
      })
      .catch((error) => {
        dispatch(setAuthLoading(false));
        dispatch(
          setMessage({
            show: true,
            header: "ERROR",
            body: error.message,
            color: "Crimson",
          })
        );
      });
  };

  const resetPassword = () => {
    const user = auth.currentUser;
    updatePassword(user, enteredNewPassword)
      .then(() => {
        logOut(
          "Password changed successfully! Login with the new password again.",
          "Green"
        );
      })
      .catch((error) => {
        dispatch(setAuthLoading(false));
        dispatch(
          setMessage({
            show: true,
            header: "ERROR",
            body: error.message,
            color: "Crimson",
          })
        );
      });
  };

  const resetEmail = () => {
    const user = auth.currentUser;
    updateEmail(user, enteredNewEmail)
      .then(() => {
        logOut(
          "Email changed successfully! Login with the new email again.",
          "Green"
        );
      })
      .catch((error) => {
        dispatch(setAuthLoading(false));
        dispatch(
          setMessage({
            show: true,
            header: "ERROR",
            body: error.message,
            color: "Crimson",
          })
        );
      });
  };

  const deleteFavorites = async () => {
    const user = auth.currentUser;
    if (confirmation === "delete") {
      await deleteDoc(doc(db, "users", user.uid));
      dispatch(
        setMessage({
          show: true,
          header: "SUCCESS",
          body: "Deletion is complete.",
          color: "RoyalBlue",
        })
      );
      dispatch(setFavoritePokemons([]));
    } else {
      dispatch(
        setMessage({
          show: true,
          header: "ERROR",
          body: "Deleting is not completed.",
          color: "Crimson",
        })
      );
    }
  };

  const deleteAccount = () => {
    const user = auth.currentUser;
    if (confirmation === "delete") {
      deleteUser(user)
        .then(async () => {
          await deleteDoc(doc(db, "users", user.uid));
          logOut("Account is deleted.", "RoyalBlue");
        })
        .catch((error) => {
          dispatch(setAuthLoading(false));
          dispatch(
            setMessage({
              show: true,
              header: "ERROR",
              body: error.message,
              color: "Crimson",
            })
          );
        });
    } else {
      dispatch(setAuthLoading(false));
      dispatch(
        setMessage({
          show: true,
          header: "ERROR",
          body: "Deleting is not completed.",
          color: "Crimson",
        })
      );
    }
  };

  return {
    signUp,
    logIn,
    resetPassword,
    resetEmail,
    deleteFavorites,
    deleteAccount,
    logOut,
    timeoutHandler,
  };
};
export default AuthFunctions;
