import express from "express";
const router = express.Router();
import { customerAuthControl } from "../controllers/mysql/customerAuth.controller";
import { customerControl } from "../controllers/mysql/customer.controller";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", customerControl.addCustomer);
router.post("/login", customerAuthControl.loginCustomer);

router.get("/", customerControl.getCustomers);
router.get("/:id", customerControl.getCustomerById);
router.put("/:id", customerControl.updateCustomer);
router.delete("/:id", customerControl.deleteCustomerById);

export default router;
