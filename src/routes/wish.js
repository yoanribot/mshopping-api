import * as express from "express";
import wishController from "../controllers/wish";

const router = express.Router();

router.get("/", wishController.getWishes);
router.get("/:id", wishController.getWish);
router.delete("/:id", wishController.removeWish);
router.get("/:id/check", wishController.checkWish);
router.get("/:id/store", wishController.goToStore);

export default router;
