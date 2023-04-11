import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",

  initialState: {
    userinfo: null ||JSON.parse( localStorage.getItem("userinfo")),
    token: null || localStorage.getItem("token"),
    userId: null || localStorage.getItem("userId"),
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", state.token);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", state.userId);
    },
    setLogout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.userId = null;
      localStorage.clear();
    },
    setUserInfo: (state, action) => {
      state.userinfo = action.payload[0];
      localStorage.setItem("userinfo", JSON.stringify(action.payload[0]));
    },
  },
});
export const { setLogin, setUserId, setLogout, setUserInfo } = auth.actions;

export default auth.reducer;
