import { createSlice } from "@reduxjs/toolkit";

export const messenger = createSlice({
  name: "messenger",

  initialState: {
    conversationFriendInfo: null,
  },
  reducers: {
    setConversationFriendInfo: (state, action) => {
      state.conversationFriendInfo = action.payload;
    },
  },
});
export const { setConversationFriendInfo } = messenger.actions;

export default messenger.reducer;
