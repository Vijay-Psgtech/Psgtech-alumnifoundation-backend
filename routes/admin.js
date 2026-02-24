// backend/routes/admin.js
// ✅ FIX: reject route is /reject/:id (matches controller export name)
const express = require("express");
const router = express.Router();
const {
  getPendingAlumni,
  getApprovedAlumni,
  approveAlumni,
  rejectAlumni,
  makeAdmin,
  getAdminStats,
} = require("../controllers/adminController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

// All routes require valid JWT + admin flag
router.use(authMiddleware, adminMiddleware);

router.get("/pending",       getPendingAlumni);
router.get("/approved",      getApprovedAlumni);
router.get("/stats",         getAdminStats);
router.put("/approve/:id",   approveAlumni);
router.put("/reject/:id",    rejectAlumni);   // ✅ was missing - matched controller
router.put("/make-admin/:id", makeAdmin);

module.exports = router;