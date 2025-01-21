import { Router } from "express";
import { addProduct, updateById, getById, deleteById, getAllProducts } from "../Controlers/product.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getById);
router.delete("/:id", deleteById);
router.put("/:id", updateById);
router.post("/", addProduct);

export default router;