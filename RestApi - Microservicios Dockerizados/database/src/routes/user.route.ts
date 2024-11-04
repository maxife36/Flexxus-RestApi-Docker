import { Router } from "express";
import controllers from "../controllers/user.controllers";

const router = Router();

router.get("/", controllers.getAllUsers);
router.get("/filter",controllers. getUserFilter);
router.get("/:id", controllers.getUser);
router.post("/", controllers.createUser);
router.patch("/:id", controllers.updateUser);
router.delete("/:id", controllers.deleteUser);

export default router;
