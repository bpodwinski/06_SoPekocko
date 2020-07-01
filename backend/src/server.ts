import App from "./app";

import * as bodyParser from "body-parser";
//import loggerMiddleware from "./middleware/logger";

import SaucesController from "./controllers/sauces.controller";
import UsersController from "./controllers/users.controller";

//const PORT = parseInt(process.env.PORT || "3000");

const app = new App({
  port: 3000,
  middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
  routes: [new SaucesController(), new UsersController()],
});

app.listen();
