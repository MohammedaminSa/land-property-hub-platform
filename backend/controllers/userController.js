// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  res.json({
    success: true,
    message: 'User profile endpoint - to be implemented'
  });
};

module.exports = {
  getUserProfile
};