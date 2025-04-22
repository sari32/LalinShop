import { Router } from "express";
import {addUser, getAllUsers, getById, getUserByNamePassword, updateById, updatePasswordById } from "../Controlers/user.js";


const router = Router();
router.get("/", getAllUsers);
router.get("/:id", getById);
router.put("/:id", updateById);
router.put("/password/:id/", updatePasswordById);
router.post("/", addUser);
router.post("/login", getUserByNamePassword);


export default router;
