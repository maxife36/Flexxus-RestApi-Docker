import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import ArticleRoutes from "./src/routes/article.routes";
import userRoutes from "./src/routes/user.route";
import errorHandler from "./src/handlers/errorHandler";
import ServiceAuthMiddleware from "./src/auth/middlewares/serviceAuth.middleware";
import LoggedAuth from "./src/auth/middlewares/userLogged.middleware";

import path from 'path';

dotenv.config({ path: path.resolve( '../.env') });;

const PORT = process.env.DATABASE_CONTAINER_PORT ?? 3001;

const AuthService = new ServiceAuthMiddleware("database", ["account","article"])
const accountAuth = AuthService.authMiddlewares.account
const articleAuth = AuthService.authMiddlewares.article

const app = express();
app.use(express.json())
app.use(cookieParser());

app.use(AuthService.serviceSignature)


app.use("/api/articles", articleAuth,  ArticleRoutes);
app.use("/api/users", accountAuth ,userRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Database microservice up on port ${PORT}`);
});
