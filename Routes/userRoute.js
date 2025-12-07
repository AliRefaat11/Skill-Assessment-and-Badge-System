const express = require("express");
const { 
    createUser, 
    editUser, 
    deleteUser, 
    getUsersByRole, 
    getUsersById} = require("../Controllers/userController");
const authService = require("../Services/authService");

const router = express.Router();

authService.allowedTo("Admin");
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUsersById);
router.get("/role/:role", getUsersByRole);

module.exports = router;