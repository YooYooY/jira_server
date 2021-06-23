import * as userController from "@/controllers/userController";
import * as projectController from "@/controllers/projectController";
import * as issuesController from "@/controllers/issuesController";
import * as commentController from "@/controllers/commentController";
import * as authController from "@/controllers/authController";

import express from "express";
import { authenticateUser } from "./middleware/authentication";

export const router = express.Router();

// public router
router.get("/user", userController.all);
router.post("/user", userController.create);

// auth vialidate 
router.use(authenticateUser);

//  private router
router.get("/user/:id", userController.one);
router.patch("/user/:id", userController.update);
router.delete("/user/:id", userController.remove);

router.get("/project", projectController.getProjectWithUsersAndIssues);
router.post("/project", projectController.create);
router.patch("/project", projectController.update);

router.get("/issue", issuesController.getProjectIssues);
router.post("/issue", issuesController.create);
router.patch("/issue/:id", issuesController.update);
router.delete("/issue/:id", issuesController.remove);

router.get("/comment", commentController.all);
router.post("/comment", commentController.create);
router.patch("/comment/:id", commentController.update);
router.delete("/comment/:id", commentController.remove);

router.get("/auth", authController.getUserMsg);

export default router;
