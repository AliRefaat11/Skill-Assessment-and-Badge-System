const express = require("express");
const { 
    createUser, 
    editUser, 
    deleteUser, 
    getUsersByRole, 
    getUsersById,
    getAllUsers} = require("../Controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);

// ✅ Put role BEFORE :id
router.get("/role/:role", getUsersByRole);

router.get("/:id", getUsersById);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);


module.exports = router;