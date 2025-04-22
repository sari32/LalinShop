import { Router } from "express";
import {addOrder, deleteById, getAllOrders, getOrderByUserId, updateSentOrder } from "../Controlers/order.js";
import { check } from "../Middlewares/check.js";

const router = Router();
router.get("/", getAllOrders);
router.get("/:userId", getOrderByUserId);
router.delete("/:id", deleteById);
router.put("/:id", updateSentOrder);
router.post("/", check, addOrder);

export default router;
