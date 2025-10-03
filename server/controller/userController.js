// Change user role to teacher
exports.changeRole = async (req, res) => {
	try {
		const userId = req.user.id;
		const { role } = req.body;
		if (role !== "teacher") {
			return res.status(400).json({ message: "Invalid role." });
		}
		const userModel = require("../model/userModel");
		const user = await userModel.findByIdAndUpdate(
			userId,
			{ $set: { role } },
			{ new: true, runValidators: true }
		).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}
		res.status(200).json({ message: "Role updated successfully.", user });
	} catch (error) {
		res.status(500).json({ message: "Server error.", error: error.message });
	}
};
// Change user password
const bcrypt = require('bcryptjs');
exports.changePassword = async (req, res) => {
	try {
		const userId = req.user.id;
		const { oldPassword, newPassword } = req.body;
		if (!oldPassword || !newPassword) {
			return res.status(400).json({ message: "Old and new password are required." });
		}
		const userModel = require('../model/userModel');
		const user = await userModel.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}
		const isMatch = await bcrypt.compare(oldPassword, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Old password is incorrect." });
		}
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newPassword, salt);
		await user.save();
		res.status(200).json({ message: "Password changed successfully." });
	} catch (error) {
		res.status(500).json({ message: "Server error.", error: error.message });
	}
};
// Edit user profile (username or role)
exports.editProfile = async (req, res) => {
	try {
		const userId = req.user.id; // Assuming user is authenticated and user info is in req.user
		const { username, role } = req.body;

		// Build update object
		const updateData = {};
		if (username) updateData.username = username;
		if (role) updateData.role = role;

		if (Object.keys(updateData).length === 0) {
			return res.status(400).json({ message: "No data provided to update." });
		}

		const userModel = require('../model/userModel');
		const updatedUser = await userModel.findByIdAndUpdate(
			userId,
			{ $set: updateData },
			{ new: true, runValidators: true }
		).select('-password'); // Exclude password from response

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found." });
		}

		res.status(200).json({
			message: "Profile updated successfully.",
			user: updatedUser
		});
	} catch (error) {
		res.status(500).json({ message: "Server error.", error: error.message });
	}
};
