import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as compression from "compression";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as path from "path";

export default class App {
  public app: express.Application;
  public port: number;

  constructor(appInit: { port: number; middlewares: any; routes: any }) {
    this.app = express();
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

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  private async dbConnector() {
    await mongoose.connect(
      "mongodb+srv://user98fhdg1:p3wn0uKhEPVD7soH@cluster0-3mlir.azure.mongodb.net/sopekocko?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  private options() {
    this.app.use(compression());
    this.app.use(
      cors({
        origin: "*",
        methods: "GET,PUT,POST,DELETE",
        allowedHeaders:
          "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
      })
    );
    this.app.use(
      "/var/images",
      express.static(path.join(__dirname, "/var/images"))
    );
  }

  private handlerError() {
    this.app.use(function (
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      console.error(err);

      if (err)
        if (err instanceof mongoose.Error.ValidationError === true) {
          res.status(400).json({
            error: {
              status: 400,
              message: err,
            },
          });
        } else {
          res.status(500).json({
            error: {
              status: 500,
              message: "Internal Server Error",
            },
          });
        }
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
