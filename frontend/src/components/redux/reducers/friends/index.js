import { createSlice } from "@reduxjs/toolkit";

export const friends = createSlice({
  name: "friends",

  initialState: {
    friends: [],
    isFriend: false,
    isAdded: false,
    isReceived: false,
    isRemoved: false,
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
        } else {
          state.isFriend = false;
        }
      });
    },

    setIsFriend: (state, action) => {
      state.isFriend = action.payload;
    },

    setIsAdded: (state, action) => {
      console.log("isAdded", action.payload);
      state.isAdded = action.payload;
    },

    setIsReceived: (state, action) => {
      console.log("isReceived", action.payload);
      state.isReceived = action.payload;
    },

    setSentReq: (state, action) => {
      console.log("bbbbbbbbbb", action.payload);
      state.sentReq = action.payload;
    },

    addToSentReq: (state, action) => {
      console.log("bbbbbbbbbb", action.payload);
      console.log("bbbbbbbbbb", state.sentReq);

      //save the sent request in the sentReq State
      state.sentReq.push(action.payload);
    },

    cancelFriendReq: (state, action) => {
      console.log("**************", action.payload);
      console.log(state.sentReq);
      //action.payload = reciver_id
      state.sentReq.forEach((element, i) => {
        if (element.receiver_id === action.payload) {
          console.log(element);
          element.splice(i, 1);
        }
      });
    },

    setReceivedReq: (state, action) => {
      state.ReceivedReq = action.payload;
    },

    declineFriendReq: (state, action) => {
      //action.payload = sender_id
      state.sentReq.forEach((element, i) => {
        if (element.sender_id === action.payload) {
          console.log(element);
          element.splice(i, 1);
        }
      });
    },

    addFriend: (state, action) => {
      state.isAdded = true;
    },

    acceptFriendRequest: (state, action) => {
      //payload= newFriend
      state.friends.push(action.payload);
    },

    removeFriend: (state, action) => {
      console.log(action.payload);
      //payload = user_id
      state.friends.map((element, i) => {
        if (element.user_id == action.payload) {
          state.friends.splice(i, 0);
        }
      });
    },

    setIsRemoved: (state, action) => {
      state.isRemoved = (action.payload);
    },
  },
});

export const {
  getAlluserFriends,
  addFriend,
  acceptFriendRequest,
  cancelFriendReq,
  declineFriendReq,
  removeFriend,
  isFriendFun,
  isTheUserIsFriend,
  setSentReq,
  setReceivedReq,
  addToSentReq,
  setIsAdded,
  setIsReceived,
  setIsFriend,
  setIsRemoved
} = friends.actions;

export default friends.reducer;
