import App from "./app";

import * as bodyParser from "body-parser";
//import loggerMiddleware from "./middleware/logger";

import SaucesController from "./controllers/sauces.controller";
import UsersController from "./controllers/users.controller";

const app = new App({
  port: 3000,
  controllers: [new SaucesController(), new UsersController()],
  middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});

app.listen();
