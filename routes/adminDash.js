// backend/routes/adminDash.js
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  getAllAlumniForAdmin,
  getPendingAlumni,
  getAlumniDetail,
  approveAlumni,
  rejectAlumni,
  makeAlumniAdmin,
  getAllDonations,
  getDonationDetail,
  updateDonationStatus,
  getDashboardStats,
} = require("../controllers/adminDashController");

// All routes protected with adminAuth middleware
router.use(adminAuth); // Protect all routes below

// ============ ALUMNI MANAGEMENT ROUTES ============

// Get all alumni
router.get("/alumni/all", getAllAlumniForAdmin);

// Get pending alumni
router.get("/alumni/pending", getPendingAlumni);

// Get single alumni detail
router.get("/alumni/:id", getAlumniDetail);

// Approve alumni registration
router.put("/alumni/:id/approve", approveAlumni);

// Reject alumni registration
router.put("/alumni/:id/reject", rejectAlumni);

// Grant admin privileges
router.put("/alumni/:id/make-admin", makeAlumniAdmin);

// ============ DONATION MANAGEMENT ROUTES ============

// Get all donations
router.get("/donations", getAllDonations);

// Get single donation detail
router.get("/donations/:id", getDonationDetail);

// Update donation status
router.put("/donations/:id/status", updateDonationStatus);

// ============ STATISTICS ROUTE ============

// Get dashboard statistics
router.get("/stats", getDashboardStats);

module.exports = router;