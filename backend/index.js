const express = require("express");
require("dotenv").config();
const cors = require("cors");

const db=require("./models/db")


const app = express();
const PORT = process.env.PORT || 5000;

// Import Routers
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const rolesRouter = require("./routes/role");

app.use(cors());
app.use(express.json());


// Routes Middleware
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter)
app.use("/roles", rolesRouter)




// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
