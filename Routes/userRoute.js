const express = require("express");
const { 
    createUser, 
    editUser, 
    deleteUser, 
    getUsersByRole, 
    getUsersById} = require("../Controllers/userController");
const { auth, allowedTo } = require('../Services/authService');

const router = express.Router();

router.post("/",allowedTo("Admin"), auth, createUser);
router.put("/:id", editUser);
router.delete("/:id", allowedTo("Admin"), auth, deleteUser);
router.get("/:id", getUsersById);
router.get("/role/:role", allowedTo("Admin"), auth, getUsersByRole);

module.exports = router;