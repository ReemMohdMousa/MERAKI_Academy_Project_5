const express = require("express");
// const pool = require("./models/db");

const cors = require("cors");
require("dotenv").config();
require("./models/db");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//routers
const usersRouter = require("./routes/user");
//const adminRouter = require("./routes/admin");






app.use("/users", usersRouter);
app.use("/admin", usersRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
