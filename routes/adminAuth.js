// backend/routes/adminAuth.js
const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  adminLogin,
  getAdminProfile,
  registerAdmin,
  changePassword,
  adminLogout,
} = require("../controllers/adminAuthController");

// Public Routes
router.post("/login", adminLogin);
router.post("/register", registerAdmin);

// Protected Routes (require admin token)
router.get("/profile", adminAuth, getAdminProfile);
router.put("/change-password", adminAuth, changePassword);
router.post("/logout", adminAuth, adminLogout);

module.exports = router;