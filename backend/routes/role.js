const express = require("express");
const {createNewRole, createNewRolePermission} = require("../controllers/role")

const rolesRouter = express.Router();
rolesRouter.post("/", createNewRole)
rolesRouter.post("/role_permission", createNewRolePermission);

module.exports = rolesRouter;
