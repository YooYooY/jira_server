import * as UserController from "@/controllers/UserController";
import express from "express";

export const router = express.Router();

router.get("/user", UserController.all);
router.get("/user/:id", UserController.one);
router.post("/user", UserController.create);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.remove);

export default router;
