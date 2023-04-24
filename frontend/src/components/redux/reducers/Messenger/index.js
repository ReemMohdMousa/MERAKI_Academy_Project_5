import { createSlice } from "@reduxjs/toolkit";

export const messenger = createSlice({
  name: "messenger",

  initialState: {
    conversationFriendInfo: null,
    newMsg: false,
  },
  reducers: {
    setConversationFriendInfo: (state, action) => {
      state.conversationFriendInfo = action.payload;
    },

    setNewMsg: (state, action) => {
      state.newMsg = action.payload;
    },
  },
});
export const { setConversationFriendInfo, setNewMsg } = messenger.actions;

export default messenger.reducer;
