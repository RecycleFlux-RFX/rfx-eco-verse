const asyncHandler = require('express-async-handler');
const PlatformSetting = require('../models/PlatformSetting');
const User = require('../models/User');

// --- Dashboard Summary ---
const getDashboardSummary = asyncHandler(async (req, res) => {
  // Mock data for now, as calculating all these metrics can be complex
  res.json({
    totalPlatformUsers: 12345,
    newUsersLastMonthPercentage: 15,
    rfxTokensDistributed: 5000000,
    platformRevenueMonthly: 25000,
    systemUptimePercentage: 99.9,
    dailyRewardAmount: 10,
    campaignRewardLimit: 1000,
    referralBonus: 50,
    maintenanceMode: 'Inactive',
    databaseTotalRecords: 1234567,
    databaseStorageUsedGB: 25.6,
    databaseQueryPerformance: 'Good',
    activeSessions: 1234,
    countriesCount: 88,
    peakConcurrentUsers: 5678,
    sslStatus: 'OK',
    firewallStatus: 'OK',
    threatsBlockedCount: 123,
    alerts: [
      { type: 'warning', message: 'High CPU Usage', details: 'CPU usage is at 85%' },
      { type: 'info', message: 'New Admin Added', details: 'A new admin was added to the system' },
    ],
  });
});

// --- Platform Settings ---

// @desc    Get platform settings
// @route   GET /api/super-admin/settings
// @access  Private/SuperAdmin
const getPlatformSettings = asyncHandler(async (req, res) => {
  const settings = await PlatformSetting.find({});
  res.json(settings);
});

// @desc    Update platform settings
// @route   PATCH /api/super-admin/settings
// @access  Private/SuperAdmin
const updatePlatformSettings = asyncHandler(async (req, res) => {
  const { key, value, description } = req.body;

  let setting = await PlatformSetting.findOne({ key });

  if (setting) {
    setting.value = value;
    setting.description = description || setting.description;
    await setting.save();
    res.json(setting);
  } else {
    setting = await PlatformSetting.create({
      key,
      value,
      description,
    });
    res.status(201).json(setting);
  }
});

// --- Admin Management ---

// @desc    Get all admins
// @route   GET /api/super-admin/admins
// @access  Private/SuperAdmin
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await User.find({ role: { $in: ['admin', 'super_admin'] } }).select('-password');
  res.json(admins);
});

// @desc    Add a new admin
// @route   POST /api/super-admin/admins
// @access  Private/SuperAdmin
const addAdmin = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    res.status(400);
    throw new Error('Please enter all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const user = await User.create({
    username,
    email,
    password,
    role: role || 'admin', // Default to admin if not specified
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Update an admin's information
// @route   PATCH /api/super-admin/admins/:id
// @access  Private/SuperAdmin
const updateAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role; // Allow changing role

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('Admin user not found');
  }
});

// @desc    Remove an admin
// @route   DELETE /api/super-admin/admins/:id
// @access  Private/SuperAdmin
const removeAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Prevent super_admin from deleting themselves or the last super_admin
    if (user.role === 'super_admin' && (await User.countDocuments({ role: 'super_admin' })) === 1) {
      res.status(400);
      throw new Error('Cannot remove the last super admin');
    }
    // Change role to user instead of deleting, or delete if desired
    user.role = 'user';
    await user.save();
    res.json({ message: 'Admin role removed, user demoted to regular user' });
  } else {
    res.status(404);
    throw new Error('Admin user not found');
  }
});

module.exports = {
  getDashboardSummary,
  getPlatformSettings,
  updatePlatformSettings,
  getAdmins,
  addAdmin,
  updateAdmin,
  removeAdmin,
};
