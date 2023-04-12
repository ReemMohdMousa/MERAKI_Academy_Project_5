const { pool } = require("../models/db");

//* add status key to the friend table (pending, accepted, declined)

const AddFriendRequest = (req, res) => {
  const { user2_id } = req.body;
  const status = "pending";
  const user_id = req.token.userId;

  console.log(user2_id);

  //user 1 sent a friend request to user 2
  // sender_id: user 1 : user_id
  // receiver_id: user 2: friend_id

  const query = `INSERT INTO friend_requests (sender_id, receiver_id, status) VALUES ($1,$2,$3) RETURNING *;`;
  const data = [user_id, user2_id, status];

  if (user_id !== user2_id) {
    pool
      .query(query, data)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Friend request sent successfully",
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
  } else {
    res.status(500).json({
      success: false,
      message: "you can't send a friend request to yourself :)",
    });
  }
};

//get all the sent request
const getAllSentRequestByUserId = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT * FROM friend_requests 
    WHERE sender_id=$1`;

  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(200).json({
          success: true,
          message: "You haven't sent any friend request",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Sent Requests",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

//get the Received requests
const getAllReceivedRequestByUserId = (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT * FROM friend_requests 
      WHERE receiver_id=$1`;

  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(200).json({
          success: true,
          message: "You haven't any friend request",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Received Requests",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

//*middleware to handle adding friend request only once from backend
const addRequestOnce = (req, res, next) => {
  //the loggedin user
  const user1_id = req.token.userId;

  //the friend ID form body:
  const { user2_id } = req.body;

  const query = `SELECT * FROM friend_requests 
    WHERE sender_id=$1 AND receiver_id=$2`;

  const data = [user1_id, user2_id];

  pool
    .query(query, data)
    .then((result) => {
      console.log(result.rows);
      //if the request not accepted yet
      if (result.rows.length === 0) {
        next();
      } else {
        res.status(200).json({
          success: false,
          message: "you have already sent the friend request",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

//*middleware to handle accepting friend request only once from backend
const acceptRequestOnce = (req, res, next) => {
  //the loggedin user
  const user1_id = req.token.userId;

  //the friend ID form body:
  const { sender_id } = req.body;

  const query = `SELECT * FROM friends 
    WHERE user1_id=$1 AND user2_id=$2 OR 
    user1_id=$1 AND user2_id=$2`;

  const data = [user1_id, sender_id];

  pool
    .query(query, data)
    .then((result) => {
      console.log(result.rows);
      //if the request not accepted yet
      if (result.rows.length === 0) {
        next();
      } else {
        res.status(200).json({
          success: false,
          message: "you have already accepted the friend request",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const acceptFriendRequest = async (req, res) => {
  //user 2 accepted the friend request user 1 sent

  //the loggedin user
  const user1_id = req.token.userId;

  //the request and the friend ID form body:
  const { user2_id } = req.body;

  const query = `INSERT INTO friends (user1_id, user2_id, accepted_at)
  VALUES ($1,$2, NOW())
  RETURNING *`;

  const deleteReqQuery = `DELETE FROM friend_requests 
  WHERE sender_id=$1 AND receiver_id=$2
  `;

  const data = [user1_id, user2_id];
  const data2 = [user2_id, user1_id];
  await pool.query(deleteReqQuery, data2);

  pool
    .query(query, data)
    .then((result) => {
      //delete the request after inserting the friend in the friends table
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "Request is not found",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Friend request accepted successfully",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

//when user who sent the friend request cancel the request
const CancelFriendRequest = (req, res) => {
  //the receiver ID:
  const receiver_id = req.params.id;

  //user ID:
  const sender_id = req.token.userId;

  const query = `DELETE FROM friend_requests 
   WHERE sender_id=$1 AND receiver_id=$2
   RETURNING *
`;

  const data = [sender_id, receiver_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `The request is not found`,
        });
      } else {
        console.log("enterd");
        res.status(200).json({
          success: true,
          message: "Friend request canceled successfully",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

//when the request receiver decline the request
const declineTheFriendReq = (req, res) => {
  //the request ID:
  const request_id = req.params.request_id;

  const query = `DELETE FROM friend_requests 
  WHERE request_id=$1 
`;

  const data = [request_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `The request with id: ${request_id} is not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Friend request declined successfully",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const RemoveFriend = (req, res) => {
  const user1_id = req.token.userId;
  const user2_id = req.params.user2_id;

  const query = `DELETE FROM friends 
WHERE user1_id=$1 OR user1_id=$2 AND user2_id=$1 OR user2_id=$2
`;

  const data = [user1_id, user2_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `Friend not found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Friend deleted successfully",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getAllFriendsByUserId = (req, res) => {
  const user_id = req.params.id;
  const request_id = req.params.request_id;

  const query = `SELECT  id, accepted_at, user_id, firstname, lastname, avatar FROM friends AS F, users AS U WHERE CASE WHEN  
  F.user1_id = $1 THEN F.user2_id = U.user_id WHEN F.user2_id = $1 THEN 
  F.user1_id = U.user_id END 
  
  `;

  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: `No Friends Found`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "All friends",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

// const isFriend = () => {
//   const loggedUserId = req.token.userId;
//   const visitedProfileUser = req.params.id;

//   const query = `SELECT  id, accepted_at, user_id, firstname, lastname, avatar FROM friends AS F, users AS U WHERE CASE WHEN
//   F.user1_id = $1 THEN F.user2_id = U.user_id WHEN F.user2_id = $1 THEN
//   F.user1_id = U.user_id END

//   `;

//   const data = [loggedUserId, visitedProfileUser];

//   pool
//     .query(query, data)
//     .then((result) => {
//       if (result.rowCount === 0) {
//         res.status(404).json({
//           success: false,
//           message: `No Friends Found`,
//         });
//       } else {
//         res.status(200).json({
//           success: true,
//           message: "All friends",
//           result: result.rows,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: "Server error",
//         err: err,
//       });
//     });
// };

module.exports = {
  AddFriendRequest,
  acceptFriendRequest,
  CancelFriendRequest,
  declineTheFriendReq,
  RemoveFriend,
  getAllSentRequestByUserId,
  getAllReceivedRequestByUserId,
  getAllFriendsByUserId,
  acceptRequestOnce,
  addRequestOnce,
};
