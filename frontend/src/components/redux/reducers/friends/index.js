import { createSlice } from "@reduxjs/toolkit";

export const friends = createSlice({
  name: "friends",

  initialState: {
    friends: [],
    isFriend: false,
    isAdded: false,
    isReceived: false,
    sentReq: [],
    ReceivedReq: [],
  },
  reducers: {
    getAlluserFriends: (state, action) => {
      //payload = array of user's friends
      console.log(action.payload);
      state.friends = action.payload;
    },

    isTheUserIsFriend: (state, action) => {
      state.friends.map((element) => {
        if (element.user_id == action.payload) {
          state.isFriend = true;
        }
      });
    },

    getAlluserSentReq: (state, action) => {
      console.log(action.payload);
    },

    getAlluserReceivedReq: (state, action) => {},

    setSentReq: (state, action) => {
      state.sentReq = action.payload;
    },

    setReceivedReq: (state, action) => {
      state.ReceivedReq = action.payload;
    },

    addFriend: (state, action) => {
      console.log(action.payload);
      state.isAdded = true;
    },

    acceptFriendRequest: (state, action) => {
      //payload= newFriend
      state.friends.push(action.payload);
    },

    cancelFriendReq: (state, action) => {
      //action.payload = reciver_id
      state.sentReq.map((element, i) => {
        if (element.receiver_id === action.payload.receiver_id) {
          element.splice(i, 1);
        }
      });
    },

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
  isTheUserIsFriend,
  setSentReq,
  setReceivedReq,
} = friends.actions;

export default friends.reducer;
