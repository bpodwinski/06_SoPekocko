"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const bodyParser = require("body-parser");
//import loggerMiddleware from "./middleware/logger";
const sauces_controller_1 = require("./controllers/sauces.controller");
const app = new app_1.default({
    port: 3000,
    controllers: [new sauces_controller_1.default()],
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});
app.listen();
//# sourceMappingURL=server.js.map