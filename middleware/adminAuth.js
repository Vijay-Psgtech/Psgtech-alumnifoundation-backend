// backend/middleware/adminAuth.js
// ✅ Kept for backwards compatibility (adminAuth routes import this)
//    Now delegates to the unified auth middleware chain.
const { authMiddleware, adminMiddleware } = require("./auth");

const adminAuth = (req, res, next) => {
  authMiddleware(req, res, (err) => {
    if (err) return next(err);
    adminMiddleware(req, res, next);
  });
};

module.exports = adminAuth;