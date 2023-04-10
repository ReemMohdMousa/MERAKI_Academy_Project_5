import { createSlice } from "@reduxjs/toolkit";

export const friends = createSlice({
  name: "friends",

  initialState: {
    friends: [],
  },
  reducers: {
    getAlluserFriends: (state, action) => {
      //payload = array of user's friends
      state.friends = action.payload;
    },

    getAlluserSentReq: (state, action) => {},

    getAlluserReceivedReq: (state, action) => {},

    addFriend: (state, action) => {},

    acceptFriendRequest: (state, action) => {},

    cancelFriendReq: (state, action) => {},

    declineFriendReq: (state, action) => {},

    removeFriend: (state, action) => {},
  },
});

export const {} = friends.actions;

export default friends.reducer;
