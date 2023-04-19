const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const db = require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Import Routers
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const rolesRouter = require("./routes/roles");
const usersRouter = require("./routes/user");
const friendsRouter = require("./routes/frineds");
const likesRouter = require("./routes/likes");
const searchRouter = require("./routes/search");
const homeRouter = require("./routes/home");
const socket = require("socket.io");
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/admin", usersRouter);
app.use("/friends", friendsRouter);
app.use("/likes", likesRouter);
app.use("/search", searchRouter);
app.use("/home", homeRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

let onlineUsers = [];
const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};
const removeUser = (soketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== soketId);
};
const getUser=(userId)=>{
  return onlineUsers.find((user)=>user.userId ==userId)
}
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("CONNECTION", (socket) => {
  console.log(socket);

  socket.on("NEW_USER", (userId) => {
 
    addNewUser(userId,socket.id)
     
  });
  socket.on("SEND_NOTIFICATIOn", (data) => {
    console.log(data);
    socket.to(data.room).emit("RECIVE_NOTIFICATION", data.content);
  });
  socket.on("DISCONNECT", () => {
   removeUser(socket.id)
  });
});
