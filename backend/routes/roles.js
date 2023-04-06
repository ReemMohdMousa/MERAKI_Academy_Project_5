const express = require("express");
const { createPermission } = require("../controllers/roles");

 

const rolesRouter = express.Router();


rolesRouter.post("/permission", createPermission);
 
module.exports = rolesRouter;
