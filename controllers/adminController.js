// backend/controllers/adminController.js
// ✅ FIX: rejectAlumni now matches route /reject/:id (not /alumni/:id/reject)
const Alumni = require("../models/Alumni");

// GET /api/admin/pending
exports.getPendingAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find({ isApproved: false }).select("-password");
    res.json({ message: "Pending alumni retrieved successfully", count: alumni.length, alumni });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/admin/approved
exports.getApprovedAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find({ isApproved: true }).select("-password");
    res.json({ message: "Approved alumni retrieved successfully", count: alumni.length, alumni });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/admin/approve/:id
exports.approveAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }           // ✅ FIX: was missing new:true
    ).select("-password");

    if (!alumni) return res.status(404).json({ message: "Alumni not found" });

    res.json({ message: "Alumni approved successfully", alumni });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/admin/reject/:id   ← ✅ FIX: route in admin.js was /reject/:id
exports.rejectAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id);
    if (!alumni) return res.status(404).json({ message: "Alumni not found" });

    res.json({ message: "Alumni registration rejected and deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/admin/make-admin/:id
exports.makeAdmin = async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      { isAdmin: true },
      { new: true }
    ).select("-password");

    if (!alumni) return res.status(404).json({ message: "Alumni not found" });

    res.json({ message: "Admin privileges granted successfully", alumni });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/admin/stats
exports.getAdminStats = async (req, res) => {
  try {
    const [totalAlumni, approvedAlumni, pendingAlumni, adminUsers] = await Promise.all([
      Alumni.countDocuments(),
      Alumni.countDocuments({ isApproved: true }),
      Alumni.countDocuments({ isApproved: false }),
      Alumni.countDocuments({ isAdmin: true }),
    ]);

    res.json({
      message: "Admin statistics retrieved successfully",
      stats: { totalAlumni, approvedAlumni, pendingAlumni, adminUsers },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};