// routes/router.js
import { Router } from "express";

// Import all feature routers
import customerRouter from "../routes/customerRoutes.js";
import tailorRouter from "../routes/tailorRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
import authRouter from "../routes/authRoutes.js";
import logisticsRouter from "../routes/logisticsRoutes.js";
import masterRouter from "../routes/masterRoutes.js";
import userRouter from "../routes/userRoutes.js";


const router = Router();

// Mount all feature routers
router.use("/auth", authRouter);
router.use("/customer", customerRouter);
router.use("/user", userRouter);
router.use("/logistics", logisticsRouter);
router.use("/tailor", tailorRouter);
router.use("/admin", adminRouter);
router.use("/master", masterRouter);

export default router;
