const express = require("express");
const {
    createInstructor } = require("../Controllers/instructorController");
const { auth, allowedTo } = require('../Services/authService');

const router = express.Router();

router.post("/",allowedTo("Admin"), auth, createInstructor);

module.exports = router;