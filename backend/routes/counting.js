const express = require("express");
const { userCount } = require("../controllers/counting");

const countingRouter = express.Router();
countingRouter.get("/user", userCount)

module.exports = countingRouter;
