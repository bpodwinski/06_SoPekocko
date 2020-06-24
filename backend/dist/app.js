"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
class App {
    constructor(appInit) {
        this.app = express();
        this.port = appInit.port;
        this.db();
        this.options();
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
    }
    middlewares(middleWares) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }
    routes(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/api", controller.router);
        });
    }
    db() {
        mongoose
            .connect("mongodb+srv://user98fhdg1:p3wn0uKhEPVD7soH@cluster0-3mlir.azure.mongodb.net/sopekocko?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
        })
            .catch((error) => {
            console.log("Unable to connect to MongoDB Atlas!");
            console.error(error);
        });
    }
    options() {
        this.app.use(compression());
        this.app.use(cors({
            origin: "*",
            methods: "GET,PUT,POST,DELETE",
            allowedHeaders: "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
        }));
        this.app.use("/var/images", express.static(path.join(__dirname, "/var/images")));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map