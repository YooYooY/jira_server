import * as UserController from "@/controllers/UserController";
import * as ProjectController from "@/controllers/ProjectController";
import express from "express";
import { authenticateUser } from "./middleware/authentication";

export const router = express.Router();

// public router
router.get("/user", UserController.all);
router.post("/user", UserController.create);

// auth vialidate 
router.use(authenticateUser);

//  private router
router.get("/user/:id", UserController.one);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.remove);

router.get("/project", ProjectController.getProjectWithUsers);
router.post("/project", ProjectController.create);
router.patch("/project", ProjectController.update);


export default router;
