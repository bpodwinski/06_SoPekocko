import * as conf from "./config/env";
import AppError from "./middlewares/error.middleware";
import * as express from "express";
import * as compression from "compression";
import * as mongoose from "mongoose";
import * as path from "path";

export default class App {
  public app: express.Application;
  public host: string;
  public port: number;

  constructor(appInit: {
    host: string;
    port: number;
    middlewares: any;
    routes: any;
  }) {
    this.app = express();
    this.host = appInit.host;
    this.port = appInit.port;

    this.dbConnector();
    this.options();
    this.middlewares(appInit.middlewares);
    this.routes(appInit.routes);
    this.handlerError();
  }

  private middlewares(middlewares: {
    forEach: (arg0: (middleware: any) => void) => void;
  }) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
    routes.forEach((routes) => {
      this.app.use("/api", routes.router);
    });
  }

  private async dbConnector() {
    await mongoose.connect(
      `mongodb+srv://${conf.DB_USER}:${conf.DB_PASS}@${conf.DB_HOST}/sopekocko?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  private options() {
    this.app.use(compression());
    this.app.use("/img", express.static(path.join(__dirname, "../img")));
  }

  private handlerError() {
    this.app.use(AppError);
  }

  public listen() {
    this.app.listen(this.port, this.host, () => {
      console.log(`App listening on the http://${this.host}:${this.port}`);
    });
  }
}
