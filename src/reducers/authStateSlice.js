import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");

const authStateSlice = createSlice({
  name: "authState",
  initialState: {
    isLogin: true,
    showForm: false,
    showMenu: false,
    token: initialToken,
    isLoggedIn: false,
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },
    setShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

const selectIsLoggedIn = createSelector(
  (state) => state.authState.token,
  (token) => Boolean(token)
);

export const { setIsLogin, setShowForm, setShowMenu, setToken, setIsLoggedIn } =
  authStateSlice.actions;
export { selectIsLoggedIn };
export default authStateSlice;
