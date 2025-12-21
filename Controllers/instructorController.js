const Instructor = require("../Models/instructorModel");
const User = require("../Models/userModel")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../Utils/apiError");
const mongoose = require('mongoose');

exports.createInstructor = asyncHandler(async(req, res) => {
    try {
        const {
            FName, 
            LName, 
            Email, 
            Password, 
            PhoneNumber, 
            Gender, 
            dateOfBirth,
            ExperienceYears, 
            status, 
            IsVerified, 
            Specialization, 
            SkillID 
        } = req.body;

        const hashedPassword = await bcrypt.hash(Password, 10);

        const user = await User.create({
            FName,
            LName,
            Email,
            Password: hashedPassword,
            PhoneNumber,
            Gender,
            dateOfBirth,
            Role: "Instructor",
        });

        const newInstructor = await Instructor.create({
            UserID: user._id,
            SkillID,
            ExperienceYears, 
            status,
            IsVerified,
            Specialization
        });
        
        const savedUser = await user.save();
        const savedInstructor = await newInstructor.save();
        res.status(201).json(savedUser, savedInstructor);
    }catch (error) {
        console.error("Create Instructor Error:", error);
          
        res.status(500).json({
            message: "Error creating Instructor",
            error: error.message,
            stack: error.stack
        });
    }          
});