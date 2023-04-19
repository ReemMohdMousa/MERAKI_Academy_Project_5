const express = require("express");
require("dotenv").config();
const socket = require("socket.io");
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
const conversationRouter = require("./routes/conversation");
const messagesRouter = require("./routes/message");

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
app.use("/conversation", conversationRouter);
app.use("/messages", messagesRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

//declare the socket.io, whick will work on my server
//instance the server
// origin => * (everywhere)
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//connection emits in the backsecene, i will receive it (connect to sockit io server)
io.on("connection", (socket) => {
  // `socket.id` is the id assigned to the user that connected
  console.log(`${socket.id} is connected`);
  io.emit("welcome", "hello this is socket server");
});
