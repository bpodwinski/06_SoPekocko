import App from "./app";

import * as bodyParser from "body-parser";
import MulterMiddleware from "./middlewares/multer";

import SaucesController from "./controllers/sauces.controller";
import UsersController from "./controllers/users.controller";

export const HOST = process.env.HOST || "0.0.0.0";
export const PORT = parseInt(process.env.PORT || "3000");

const app = new App({
  host: HOST,
  port: PORT,
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    MulterMiddleware.single("image"),
  ],
  routes: [new SaucesController(), new UsersController()],
});

app.listen();
