import { createSlice } from "@reduxjs/toolkit";

export const friends = createSlice({
  name: "friends",

  initialState: {
    friends: [],
    isFriend: false,
    isAdded: false,
    isReceived: false,
  },
  reducers: {
    getAlluserFriends: (state, action) => {
      //payload = array of user's friends
      console.log(action.payload);
      state.friends = action.payload;
    },

    isFriendFun: (state, action) => {
      state.isFriend = true;
    },

    getAlluserSentReq: (state, action) => {
      console.log(action.payload);
    },

    getAlluserReceivedReq: (state, action) => {},

    addFriend: (state, action) => {
      console.log(action.payload);
      state.isAdded = true;
    },

    acceptFriendRequest: (state, action) => {},

    cancelFriendReq: (state, action) => {},

    declineFriendReq: (state, action) => {},

    removeFriend: (state, action) => {
      //payload = user_id
      state.friends.map((element, i) => {
        if (element.user_id === action.payload) {
          state.friends.splice(i, 0);
        }
      });
    },
  },
});

export const {
  getAlluserFriends,
  getAlluserSentReq,
  getAlluserReceivedReq,
  addFriend,
  acceptFriendRequest,
  cancelFriendReq,
  declineFriendReq,
  removeFriend,
  isFriendFun,
} = friends.actions;

export default friends.reducer;
