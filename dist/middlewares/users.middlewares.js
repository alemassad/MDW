"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMiddleware = void 0;
const formatMiddleware = (req, res, next) => {
    req.params.name = req.params.name.toUpperCase();
    next();
};
exports.formatMiddleware = formatMiddleware;
