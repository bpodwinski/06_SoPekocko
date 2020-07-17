import * as conf from "./config/env";
import App from "./app";
import * as bodyParser from "body-parser";

// Middlewares import
import MulterMiddleware from "./middlewares/multer.middleware";
import CorsMiddleware from "./middlewares/cors.middleware";

// Routes import
import UsersRoute from "./routes/users.route";
import SaucesRoute from "./routes/sauces.route";

const app: any = new App({
  host: conf.HOST,
  port: conf.PORT,
  middlewares: [
    new CorsMiddleware().cors,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    new MulterMiddleware().multer.single("image"),
  ],
  routes: [new UsersRoute(), new SaucesRoute()],
});

app.listen();
