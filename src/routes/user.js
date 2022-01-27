import * as express from "express";
import userController from "../controllers/user";

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/:userId/wishes", userController.addWish);
router.put("/:userId/wishes/:wishId", userController.updateWish);
router.delete("/:userId/wishes/:wishId", userController.removeWish);
router.get("/auth0/:id", userController.getUserByAuth0);
router.post("/", userController.insertUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.removeUser);

export default router;
