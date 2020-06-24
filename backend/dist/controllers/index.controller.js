"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SauceController = void 0;
const express = require("express");
class SauceController {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/", this.index);
    }
    index(req, res) {
        res.json({
            message: "Coucou !",
        });
    }
}
exports.SauceController = SauceController;
exports.default = IndexController;
//# sourceMappingURL=index.controller.js.map