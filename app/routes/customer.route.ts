import express from "express";
const router = express.Router();
import { customerAuthControl } from "../controllers/customerAuth.controller";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller";

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post("/",createCustomer);
router.post('/login', customerAuthControl.loginCustomer);

router.get("/", getAllCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
