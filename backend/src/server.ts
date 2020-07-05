import App from "./app";
import * as bodyParser from "body-parser";

// Middlewares import
import MulterMiddleware from "./middlewares/multer";
import CorsMiddleware from "./middlewares/cors";

// Routes import
import UsersRoute from "./routes/users.route";
import SaucesRoute from "./routes/sauces.route";

// Env variables
export const HOST: string = process.env.HOST || "0.0.0.0";
export const PORT: number = parseInt(process.env.PORT || "3000");
export const TOKEN: string =
  process.env.ACCESS_TOKEN_SECRET || "3P5DEkDn8yz0H9IgVU22";

const app: any = new App({
  host: HOST,
  port: PORT,
  middlewares: [
    new CorsMiddleware().cors,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    new MulterMiddleware().multer.single("image"),
  ],
  routes: [new UsersRoute(), new SaucesRoute()],
});

app.listen();
