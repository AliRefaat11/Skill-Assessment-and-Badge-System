const User = require("../Models/userModel");
const mongoose = require('mongoose');

exports.createUser = async (req, res) => {
    try {
        const {FName, LName, Email, Password, PhoneNumber, Gender, Role} = req.body;
        const newUser = new User({
            FName,
            LName,
            Email,
            Password,
            PhoneNumber,
            Gender,
            Role
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }   
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: "Error updating user", error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting user", error });
    }
};

exports.getUsersById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User id is required" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user id" });
        }
        const user = await User.findById(id).select('-Password -__v');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching user", error });
    }
};

exports.getUsersByRole = async (req, res) => {
    try {
        const { role } = req.params;
        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }
        const users = await User.find({ Role: role }).select('-Password -__v');
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found with the specified role" });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users by role", error });
    }
};