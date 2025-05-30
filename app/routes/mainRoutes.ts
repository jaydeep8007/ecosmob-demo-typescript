import express from "express";
const router = express.Router();
// const VERIFY = require('../util/userAuth');
import customerRoutes from "./customerRoutes";

router.use("/api/v1/customer/", customerRoutes);
// router.use(VERIFY);

export default router;
