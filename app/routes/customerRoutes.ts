import { Router } from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController";

const router = Router();

router.post("/", createCustomer);
router.get("/", getAllCustomers);
// router.get('/:id', getCustomerById);
// router.put('/:id', updateCustomer);
// router.delete('/:id', deleteCustomer);

export default router;
