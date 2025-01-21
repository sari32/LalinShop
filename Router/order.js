import { Router } from "express";
import {addOrder, deleteById, getAllOrders, getOrderByUserId, updateSentOrder } from "../Controlers/order.js";

const router = Router();
router.get("/", getAllOrders);
router.get("/:userId", getOrderByUserId);
router.delete("/:id", deleteById);
router.put("/:id", updateSentOrder);
router.post("/", addOrder);

export default router;