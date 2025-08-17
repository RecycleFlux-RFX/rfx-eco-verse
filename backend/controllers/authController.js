const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/jwt');
const crypto = require('crypto');

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    rfxBalance: 10, // Welcome bonus
  });

  if (user) {
    res.status(201).json({
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        rfxBalance: user.rfxBalance,
        co2Saved: user.co2Saved,
        xp: user.xp,
        level: user.level, // Assuming level is derived from XP or a separate field
        achievements: user.achievements,
        referralCode: user.referralCode,
        avatar: user.avatar,
        joinedAt: user.joinedAt,
      },
      message: "Account created successfully. Welcome bonus applied."
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  // Check for user email
  const user = await User.findOne({ email }).select('+password'); // Select password to compare

  if (user && (await user.matchPassword(password))) {
    res.json({
      token: generateToken(user._id, user.role),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        rfxBalance: user.rfxBalance,
        co2Saved: user.co2Saved,
        xp: user.xp,
        level: user.level, // Assuming level is derived from XP or a separate field
        achievements: user.achievements,
        referralCode: user.referralCode,
        avatar: user.avatar,
        joinedAt: user.joinedAt,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Request password reset link
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User with this email not found.');
  }

  // Generate reset token (for simplicity, not sending email yet)
  const resetToken = crypto.randomBytes(20).toString('hex');
  // In a real app, you would save this token to the user in the DB with an expiry
  // and send it via email.

  res.status(200).json({
    message: 'Password reset link sent to your email. (Simulated)',
    resetToken: resetToken // For testing, remove in production
  });
});

// @desc    Reset password with token
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  // In a real app, you would verify the token against the one stored in the DB
  // and check its expiry.
  if (!token || !newPassword) {
    res.status(400);
    throw new Error('Please provide token and new password');
  }

  // Simulate token verification
  if (token !== 'test_reset_token') { // Replace with actual token verification
    res.status(400);
    throw new Error('Invalid or expired token.');
  }

  // Find user by token (simulated)
  const user = await User.findOne({ email: 'test@example.com' }); // Replace with actual user lookup by token

  if (!user) {
    res.status(400);
    throw new Error('Invalid or expired token.');
  }

  user.password = newPassword; // Password will be hashed by pre-save hook
  await user.save();

  res.status(200).json({
    message: 'Password has been reset successfully.'
  });
});

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
