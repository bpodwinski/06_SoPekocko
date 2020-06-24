import * as express from "express";
import * as compression from "compression";
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as path from "path";

export default class App {
  public app: express.Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;

    this.db();
    this.options();
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  private db(): void {
    mongoose
      .connect(
        "mongodb+srv://user98fhdg1:p3wn0uKhEPVD7soH@cluster0-3mlir.azure.mongodb.net/sopekocko?retryWrites=true&w=majority",
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
      })
      .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
      });
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

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
