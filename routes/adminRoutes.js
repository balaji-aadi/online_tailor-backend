import express from "express";
import {
  validateAdminUserVerification,
  validateBulkImport,
  validateBroadcastNotification,
  validateDisputeResolution,
  validateContentUpdate,
} from "../validators/adminValidators.js";
import { verifyJWT } from "../middleware/authMiddleware.js";
import {
  approveUser,
  blacklistUser,
  broadcastNotifications,
  bulkExportUsers,
  bulkImportUsers,
  getDisputeDetails,
  initiateDispute,
  mediateDispute,
  updateUserRole,
  verifyUser,
  whitelistUser,
} from "../controllers/adminController.js";
import {
  getBusinessIntelligence,
  getGeographicDistribution,
  getRealTimeMetrics,
} from "../services/analyticsService.js";
import { adminOnly } from "../middleware/role.middleware.js";
import { logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.use(verifyJWT);

// Allow authenticated users to logout even if they hit the admin path
router.post("/logout", logoutUser);

// Admin-only routes from here on
// router.use(authorizeAdmin);



// User verification and approval
router.post(
  "/users/verify",
  validateAdminUserVerification,
  verifyJWT,
  verifyUser
);
router.post("/users/approve", approveUser);
router.put("/users/roles/:userId", updateUserRole);

// Bulk import/export
router.post("/users/import", validateBulkImport, bulkImportUsers);
router.get("/users/export", bulkExportUsers);

// Broadcast notifications
router.post(
  "/notifications/broadcast",
  validateBroadcastNotification,
  broadcastNotifications
);

// Blacklist / Whitelist
router.post("/users/blacklist", blacklistUser);
router.post("/users/whitelist", whitelistUser);

// White-label config management
// router.get("/config/whitelabel", getWhiteLabelConfig);
// router.put("/config/whitelabel", updateWhiteLabelConfig);

// Analytics & Reporting
router.get("/analytics/metrics", getRealTimeMetrics);
router.get("/analytics/geodistribution", getGeographicDistribution);
router.get("/analytics/bi", getBusinessIntelligence);

// Dispute resolution
router.post("/disputes/initiate", validateDisputeResolution, initiateDispute);
router.put("/disputes/:disputeId/mediate", mediateDispute);
router.get("/disputes/:disputeId", getDisputeDetails);

// Content management
// router.get("/content", listContent);
// router.post("/content", validateContentUpdate, createContent);
// router.put("/content/:contentId", validateContentUpdate, updateContent);
// router.delete("/content/:contentId", deleteContent);

export default router;
