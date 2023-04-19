import { createSlice } from "@reduxjs/toolkit";

export const messenger = createSlice({
  name: "messenger",

  initialState: {
    friendInfo: null,
  },
  reducers: {
    setFriendInfo: (state, action) => {
      state.friendInfo = action.payload;
    },
  },
});
export const { setFriendInfo } = messenger.actions;

export default messenger.reducer;
