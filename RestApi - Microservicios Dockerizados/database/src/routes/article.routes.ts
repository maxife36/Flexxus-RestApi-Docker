import { Router } from "express";
import controllers from "../controllers/article.controllers";

const router = Router();

router.get("/", controllers.getAllArticles);
router.get("/filter", controllers.getFilteredArticles);
router.get("/:id", controllers.getArticle);
router.post("/", controllers.createArticle);
router.patch("/:id", controllers.updateArticle);
router.delete("/:id", controllers.deleteArticle);

export default router;
