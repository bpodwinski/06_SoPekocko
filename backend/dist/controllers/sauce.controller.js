"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class SauceController {
    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/sauces", this.index);
    }
    index(req, res) {
        res.json({
            message: "Coucou !",
        });
    }
}
exports.default = SauceController;
//# sourceMappingURL=sauce.controller.js.map