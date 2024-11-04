import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import ArticleRoutes from "./src/routes/article.routes";
import errorHandler from "./src/handlers/errorHandler";
import ServiceAuthMiddleware from "./src/auth/middlewares/serviceAuth.middleware";
import LoggedAuth from "./src/auth/middlewares/userLogged.middleware";

import path from 'path';

dotenv.config({ path: path.resolve( '../.env') });;

const PORT = process.env.ARTICLE_CONTAINER_PORT ?? 3003;

const AuthService = new ServiceAuthMiddleware("article", [])

const app = express();
app.use(express.json())
app.use(cookieParser());

app.use(AuthService.serviceSignature)

app.use("/api/articles", LoggedAuth,  ArticleRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Article microservice up on port ${PORT}`);
});
