const User = require('../models/User');

/**
 * @route   GET /api/v1/users
 * @desc    Get list of all users
 * @access  Public
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select({ _id: 1, username: 1 });

    return res.status(200).json({
      success: true,
      status: 200,
      count: users.length,
      data: users,
    });
  } catch {
    return res.status(500).json({
      success: false,
      status: 500,
      error: 'Server Error',
    });
  }
};
