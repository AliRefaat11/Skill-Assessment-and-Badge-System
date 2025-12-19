const Instructor = require("../Models/instructorModel");
const User = require("../Models/userModel")
const asyncHandler = require("express-async-handler");
const ApiError = require("../Utils/apiError");
const mongoose = require('mongoose');

exports.createInstructor = asyncHandler(async(req, res) => {
    try {
        const {FName, LName, Email, Password, PhoneNumber, Gender, ExperienceYears, Status, IsVerified, Specialization, SkiilID} = req.body();
        const newUser = new User({
            FName,
            LName,
            Email,
            Password,
            PhoneNumber,
            Gender,
            Role: Instructor
        });

        const newInstructor = new Instructor({
            SkiilID,
            ExperienceYears, 
            Status,
            IsVerified, 
            Specialization
        });
        const savedUser = await newUser.save();
        const savedInstructor = await newInstructor.save();
        res.status(201).json(savedUser, savedInstructor);
    } catch (error) {
        res.status(500).json({ message: "Error creating Instructor", error });
    }
});