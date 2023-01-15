import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "./reducers/authStateSlice";
import HeaderBar from "./components/ui/HeaderBar";
import MessageDisplay from "./components/ui/MessageDisplay";
import PokemonDetailCard from "./components/pokemons/PokemonDetailCard";
import AuthFunctions from "./components/auth/AuthFunctions";
import AuthForm from "./components/auth/AuthForm";
import GetFavoritePokemons from "./components/utility/GetFavoritePokemons";
import HomePage from "./pages/HomePage";
import Settings from "./pages/Settings";
import FavoritePokemons from "./pages/FavoritePokemons";
import WelcomePage from "./pages/WelcomePage";

////////////////////////////////////////////////
// Top component that handles timeout and routes
////////////////////////////////////////////////
function App() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);
  const detailCard = useSelector((state) => state.detailCard);
  const message = useSelector((state) => state.message);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  ///// If logged in, setTimeout and get favorite pokemons from database /////
  useEffect(() => {
    const setTimeOut = async () => {
      const authFunctions = await AuthFunctions({
        dispatch,
      });
      const { timeoutHandler } = authFunctions;
      return timeoutHandler();
    };
    if (isLoggedIn) {
      setTimeOut();
      GetFavoritePokemons({ dispatch });
    }
  }, [isLoggedIn]);

  return (
    <div>
      {detailCard.show && <PokemonDetailCard />}
      {authState.showForm && <AuthForm />}
      {message.show && <MessageDisplay />}

      <HashRouter>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {isLoggedIn && <Route path="/profile" element={<WelcomePage />} />}
          {isLoggedIn && (
            <Route path="/profile/favorites" element={<FavoritePokemons />} />
          )}
          {isLoggedIn && (
            <Route path="/profile/settings" element={<Settings />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
export default App;
