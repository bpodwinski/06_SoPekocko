"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const sauces_model_1 = require("../models/sauces.model");
class SaucesController {
    constructor() {
        this.router = express.Router();
        // List all sauces
        this.list = (req, res) => {
            sauces_model_1.default.find()
                .then((sauces) => {
                res.status(200).json(sauces);
            })
                .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/sauces", this.list);
    }
}
exports.default = SaucesController;
//# sourceMappingURL=sauces.controller.js.map