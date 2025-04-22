import { Router } from "express";
import { addProduct, updateById, getById, deleteById, getAllProducts, getTotalCount } from "../Controlers/product.js";
import { check, checkManager } from "../Middlewares/check.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/total", getTotalCount)
router.get("/:id", getById);
router.delete("/:id",checkManager, deleteById);
router.put("/:id",checkManager, updateById);
router.post("/",checkManager ,addProduct);

export default router;