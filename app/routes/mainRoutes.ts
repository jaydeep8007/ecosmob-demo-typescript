import express from "express";
import customerRoutes from "./../routes/customerRoutes";

const router = express.Router();

router.use("/customer", customerRoutes);

export default router;
