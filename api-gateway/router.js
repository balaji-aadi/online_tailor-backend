// routes/router.js
import { Router } from "express";

// Import all feature routers
import customerRouter from "../routes/customerRoutes.js";
import tailorRouter from "../routes/tailorRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
import authRouter from "../routes/authRoutes.js";
import logisticsRouter from "../routes/logisticsRoutes.js";
import masterRouter from "../routes/masterRoutes.js";


const router = Router();

// Mount all feature routers
router.use("/auth", authRouter);
router.use("/user", customerRouter);
router.use("/logistics", logisticsRouter);
router.use("/tailor", tailorRouter);
router.use("/admin", adminRouter);
router.use("/master", masterRouter);
router.use("/tailor", tailorRouter);

export default router;
