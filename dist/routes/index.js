"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_route_1 = __importDefault(require("./users.route"));
const cars_route_1 = __importDefault(require("./cars.route"));
const category_route_1 = __importDefault(require("./category.route"));
const router = (0, express_1.Router)();
router.use("/users", users_route_1.default);
router.use("/cars", cars_route_1.default);
router.use("/categories", category_route_1.default);
exports.default = router;
