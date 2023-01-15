import { setFavoritePokemons } from "../../reducers/favoritePokemonsSlice";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import app from "../firebase/FirebaseConfig";

///////////////////////////////////////////////////
//Function that will get the favorite pokemons from
// the firestore and set them to a state to be used
// in other components.
///////////////////////////////////////////////////
const GetFavoritePokemons = async ({ dispatch }) => {
  const db = getFirestore(app);
  const auth = getAuth(app);

  auth.onIdTokenChanged((user) => {
    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "users", uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const initialState = docSnap.data().favoritePokemons;
          dispatch(setFavoritePokemons(initialState));
        } else {
        }
      });
    }
  });
};

export default GetFavoritePokemons;
