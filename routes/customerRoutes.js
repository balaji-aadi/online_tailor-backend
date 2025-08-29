import express from "express";
import * as customerController from "../controllers/customerController.js";
import {
  validateOrderPlacement,
  validateReviewSubmission,
  validateProfileUpdate,
} from "../validators/customerValidators.js";
import multer from "../middleware/multer.middleware.js";
import { getUserById } from "../controllers/user.controller.js";

const router = express.Router();




router.post("/user-register",multer.uploadUserFiles(),customerController.registerCustomer);
router.get("/get-user-profile",customerController.getLoggedInCustomer);
router.get("/get-user-profile/:customerId",customerController.getCustomerById);
router.put("/update-customer-profile/:userId", multer.uploadUserFiles(), customerController.updateCustomer);
router.delete("/delete-customer-profile/:userId", customerController.deleteCustomer);
router.put("/update-user-measurements/:customerId", customerController.updateCustomerMeasurements);


/** ---------------- PUBLIC ROUTES ---------------- */
router.post("/discovery/search", customerController.searchTailors);
router.post("/discovery/recommendations", customerController.getRecommendations);
router.get("/events/calendar", customerController.getEventsCalendar);


/** Order placement and tracking */
router.post("/orders", validateOrderPlacement, customerController.placeOrder);
router.get("/orders/:orderId/tracking", customerController.getOrderTracking);
router.get("/orders/history", customerController.getOrderHistory);
router.post("/orders/:orderId/payment", customerController.makePayment);
router.get("/orders/:orderId/status", customerController.getOrderStatus);
router.post("/orders/:orderId/photo-update",multer.uploadSingle("progressPhoto"),customerController.uploadProgressPhoto);

/** Personal management */
router.get("/profile", customerController.getProfile);
router.put("/profile", validateProfileUpdate, customerController.updateProfile);
router.get("/family-profiles", customerController.listFamilyProfiles);
router.post("/family-profiles", customerController.createFamilyProfile);

/** Community features */
router.post("/reviews", validateReviewSubmission, customerController.submitReview);
router.get("/reviews/:tailorId", customerController.listReviews);
router.post("/reviews/:reviewId/report", customerController.reportReview);
router.get("/referrals/status", customerController.getReferralStatus);
router.post("/referrals/invite", customerController.sendReferralInvite);
router.post("/social/share", customerController.shareOnSocialMedia);

export default router;
