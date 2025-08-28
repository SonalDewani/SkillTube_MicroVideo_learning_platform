const helper = require('../helper/helperFunctions');
const User = require('../model/userModel');

// register
const register = async (req, res) => {
  try {
    const { username, email, password, phone = '', role = 'student' } = req.body;

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Password validation (min 8 chars, at least one letter and one number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error('Password must be at least 8 characters long and contain both letters and numbers');
    }

    // Phone validation (optional, if provided)
    if (phone) {
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!phoneRegex.test(phone)) {
        throw new Error('Invalid phone number format');
      }
    }

    const existing = await User.findOne({ email });
    if (existing) throw new Error('User already exists');

    const hashed = await helper.hashPassword(password);
    const user = await User.create({ username, email, password: hashed, phone, role });
    res.status(201).json({ token: helper.generateToken(user), user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await helper.comparePasswords(password, user.password)))
      throw new Error('Invalid credentials');

    res.json({ token: helper.generateToken(user), user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// get me
const getMe = async (req, res) => {
  res.json(req.user); // JWT data
};

module.exports = { register, login, getMe,logoutUser };
