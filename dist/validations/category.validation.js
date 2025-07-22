"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryValidation = exports.updateCategoryValidation = exports.createCategoryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createCategoryBodySchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required(),
    description: joi_1.default.string().min(3).max(500).required(),
    cars: joi_1.default.array().items(joi_1.default.string().hex().length(24)).optional(),
    isActive: joi_1.default.boolean().optional(),
});
const updateCategoryBodySchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).optional(),
    description: joi_1.default.string().min(3).max(500).optional(),
    cars: joi_1.default.array().items(joi_1.default.string().hex().length(24)).optional(),
    isActive: joi_1.default.boolean().optional(),
});
const categoryParamSchema = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required(),
});
const createCategoryValidation = (req, res, next) => {
    const { error } = createCategoryBodySchema.validate(req.body);
    if (error) {
        res.status(400).json({
            message: error.details[0].message,
            error: true,
        });
        return;
    }
    next();
};
exports.createCategoryValidation = createCategoryValidation;
const updateCategoryValidation = (req, res, next) => {
    const { error: bodyError } = updateCategoryBodySchema.validate(req.body);
    const { error: paramError } = categoryParamSchema.validate(req.params);
    if (bodyError) {
        res.status(400).json({
            message: bodyError.details[0].message,
            error: true,
        });
        return;
    }
    if (paramError) {
        res.status(400).json({
            message: paramError.details[0].message,
            error: true,
        });
        return;
    }
    next();
};
exports.updateCategoryValidation = updateCategoryValidation;
const deleteCategoryValidation = (req, res, next) => {
    const { error } = categoryParamSchema.validate(req.params);
    if (error) {
        res.status(400).json({
            message: error.details[0].message,
            error: true,
        });
        return;
    }
    next();
};
exports.deleteCategoryValidation = deleteCategoryValidation;
