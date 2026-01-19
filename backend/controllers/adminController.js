// @desc    Get admin dashboard data
// @route   GET /api/admin/dashboard
// @access  Private (Admin only)
exports.getAdminDashboard = async (req, res) => {
  res.json({
    success: true,
    message: 'Admin dashboard endpoint - to be implemented'
  });
};