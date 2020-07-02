import App from "./app";

import * as bodyParser from "body-parser";
import MulterMiddleware from "./middlewares/multer";

import SaucesController from "./controllers/sauces.controller";
import UsersController from "./controllers/users.controller";

//const PORT = parseInt(process.env.PORT || "3000");

const app = new App({
  port: 3000,
  middlewares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    MulterMiddleware.single("image"),
  ],
  routes: [new SaucesController(), new UsersController()],
});

app.listen();
