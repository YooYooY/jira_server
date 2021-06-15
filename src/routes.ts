import * as UserController from "@/controllers/UserController";
import express from "express";
import { authenticateUser } from "./middleware/authentication";

export const router = express.Router();

router.get("/user", UserController.all);
router.get("/user/:id", UserController.one);
router.post("/user", UserController.create);
router.patch("/user/:id", authenticateUser, UserController.update);
router.delete("/user/:id", authenticateUser, UserController.remove);

export default router;
