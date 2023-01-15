import { useSelector, useDispatch } from "react-redux";
import { setFavoritePokemons } from "../../reducers/favoritePokemonsSlice";
import { selectIsLoggedIn } from "../../reducers/authStateSlice";
import {
  setDetailCard,
  setBackToInitial,
} from "../../reducers/detailCardSlice";
import CloseButton from "../ui/CloseButton";
import Backdrop from "../ui/Backdrop";
import FetchDetailedData from "../api/FetchDetailedData";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import app from "../firebase/FirebaseConfig";

const db = getFirestore(app);
const auth = getAuth(app);

/////////////////////////////////////////////////////////////////////
// This component creates a bigger and more detailed wrapper card for
// individual pokemons when clicked on them.
/////////////////////////////////////////////////////////////////////
const PokemonDetailCard = () => {
  const dispatch = useDispatch();
  const detailCard = useSelector((state) => state.detailCard);
  const isLoading = useSelector((state) => state.isLoading);
  const favoritePokemons = useSelector((state) => state.favoritePokemons);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  let newFavoritePokemons;

  const user = auth.currentUser;
  let uid;
  if (user !== null) {
    uid = user.uid;
  }

  // Get the detailed info for the selected pokemon
  FetchDetailedData();

  //Function that changes the currently displayed Pokemon
  const handleClick = (pokemon) => {
    if (pokemon.id !== detailCard.id) {
      dispatch(
        setDetailCard({
          show: true,
          id: pokemon.id,
          name: pokemon.name,
        })
      );
    }
  };

  // Add pokemon to the database if it is liked
  const addPokemonToDatabase = async (userUid, favoritePokemons) => {
    try {
      const docRef = await setDoc(doc(db, "users", userUid), {
        favoritePokemons: favoritePokemons,
      });
      console.log("Success");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Add pokemon to favorites list when liked by the user
  const handleLike = (pokemon) => {
    if (favoritePokemons.includes(Number(pokemon.id))) {
      newFavoritePokemons = favoritePokemons.filter(
        (p) => p !== Number(pokemon.id)
      );
      dispatch(setFavoritePokemons(newFavoritePokemons));
    } else {
      newFavoritePokemons = favoritePokemons.concat(Number(pokemon.id));
      dispatch(setFavoritePokemons(newFavoritePokemons));
    }

    addPokemonToDatabase(uid, newFavoritePokemons);
  };

  return (
    <div>
      <Backdrop />
      {isLoading.detailedData ? (
        // If still loading, show loading indicator instead else show the card
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <i className="fa fa-spinner fa-pulse fa-10x fa-fw text-white"></i>
        </div>
      ) : (
        ////////////////////////////////////
        // Main border of detailed card
        ////////////////////////////////////
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col
w-[350px] bg-white rounded-xl z-[30] border-[#b259ff] border-solid border-[4px] max-[420px]:scale-[0.9]"
        >
          {/* //////////////////////////////////////////////////////////////////////////////// */}
          {/* First section of detailed card that contains id, name, genera and closing button */}
          {/* //////////////////////////////////////////////////////////////////////////////// */}
          <div
            className="realtive flex flex-col justify-center items-center border-[#b259ff] border-b-[4px]
        bg-[#7542a4] text-white rounded-t-md py-2"
          >
            <CloseButton onClick={() => dispatch(setBackToInitial())} />
            {/* If logged in, show heart logo */}
            {isLoggedIn && (
              <i
                className="absolute fa fa-heart left-5"
                aria-hidden="true"
                onClick={() => handleLike(detailCard)}
                style={{
                  color: favoritePokemons.includes(Number(detailCard.id))
                    ? "red"
                    : "white",
                }}
              ></i>
            )}
            <div className="font-bold text-xl">
              {detailCard.id} - {detailCard.name.toUpperCase()}
            </div>
            <div>{detailCard.genera.toLowerCase()}</div>
          </div>

          {/* //////////////////////////////////////////////////////////////////////////////////// */}
          {/* Second section of the detailed card which contains pokemon image and generation info */}
          {/* //////////////////////////////////////////////////////////////////////////////////// */}
          <div className="bg-slate-200">
            <div className="flex flex-col justify-center items-center scale-[0.75]">
              <img
                className=" border-4 border-[#9982b8] rounded-t-lg bg-[#dab57e]"
                src={detailCard.artWork}
                alt="Pokemon artwork"
              />
              <div
                className="flex w-full justify-center items-center font-medium text-gray-700 border-x-4 border-b-4
           border-[#9982b8] rounded-b-lg bg-slate-50 pb-1"
              >
                {detailCard.generation}
              </div>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////// */}
            {/* Third section of the detailed card which contains information about pokemon */}
            {/* /////////////////////////////////////////////////////////////////////////// */}
            <div className="flex text-sm items-center bg-[#a185d9] border-[#b259ff] border-y-[4px]">
              <div className="border border-gray-700 m-5 p-1 bg-slate-50 rounded-lg">
                {detailCard.text.toLowerCase().replace("\f", " ")}
              </div>
            </div>
          </div>

          {/* /////////////////////////////////////////////////////////////////////////////////////// */}
          {/* Fourth and last section of the detailed card which contains evolution chain information */}
          {/* /////////////////////////////////////////////////////////////////////////////////////// */}
          <div
            className="flex flex-col border-t-gray-700 pt-2 pb-1 
        rounded-b-lg justify-center items-center bg-slate-200"
          >
            <div className="border border-gray-700 rounded-lg text-white bg-[#7542a4] px-2">
              evolution chain
            </div>

            {/* /////////////////// */}
            {/* First evolution box */}
            {/* /////////////////// */}
            <div className="flex flex-row">
              {detailCard.firstEvolution.id && (
                <div
                  className="flex flex-col m-2"
                  onClick={() => handleClick(detailCard.firstEvolution)}
                >
                  <img
                    className="h-[70px] w-[70px] border-2 border-[#6d6bac] rounded-2xl mx-auto bg-white"
                    alt="First pokemon of the evolution chain"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailCard.firstEvolution.id}.png`}
                  />
                  <div
                    className="flex justify-center items-center h-[20px] pb-1 px-1 mt-2 text-[14px] text-white font-medium
                 border border-gray-700 rounded-lg bg-[#767fce]"
                  >
                    {detailCard.firstEvolution.name}
                  </div>
                </div>
              )}

              {/* //////////////////// */}
              {/* Second evolution box */}
              {/* //////////////////// */}
              {detailCard.secondEvolution.id && (
                <div className="flex flex-row relative">
                  {/* Arrow */}
                  <div className="absolute top-[30px] -left-[8px]">➔</div>
                  <div
                    className="flex flex-col  m-2"
                    onClick={() => handleClick(detailCard.secondEvolution)}
                  >
                    <img
                      className="h-[70px] w-[70px] border-2 border-[#6d6bac] rounded-2xl mx-auto bg-white"
                      alt="Second pokemon of the evolution chain"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailCard.secondEvolution.id}.png`}
                    />
                    <div
                      className="flex justify-center items-center h-[20px] pb-1 px-1 text-[14px] text-white font-medium
                   border border-gray-700 rounded-lg mt-2 bg-[#767fce]"
                    >
                      {detailCard.secondEvolution.name}
                    </div>
                  </div>
                </div>
              )}

              {/* /////////////////// */}
              {/* Third evolution box */}
              {/* /////////////////// */}
              {detailCard.thirdEvolution.id && (
                <div className="flex flex-row relative">
                  <div className="absolute top-[30px] -left-[8px]">➔</div>
                  <div
                    className="flex flex-col m-2"
                    onClick={() => handleClick(detailCard.thirdEvolution)}
                  >
                    <img
                      className="h-[70px] w-[70px] border-2 border-[#6d6bac] rounded-2xl mx-auto bg-white"
                      alt="Third pokemon of the evolution chain"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detailCard.thirdEvolution.id}.png`}
                    />
                    <div
                      className="flex justify-center items-center h-[20px] pb-1 px-1 text-[14px] text-white font-medium
                   border border-gray-700 rounded-lg mt-2 bg-[#767fce]"
                    >
                      {detailCard.thirdEvolution.name}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetailCard;
