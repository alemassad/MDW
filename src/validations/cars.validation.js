"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCarValidation = exports.updateCarValidation = exports.createCarValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const createCarBodyValidationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required(),
    description: joi_1.default.string().min(3).max(500).required(),
    amount: joi_1.default.number().min(0).required(),
    price: joi_1.default.number().min(0).required(),
    category: joi_1.default.string().hex().length(24).optional(),
    image: joi_1.default.string().required(),
    ownerId: joi_1.default.string().hex().length(24).optional(),
});
const createCarValidation = (req, res, next) => {
    const { error } = createCarBodyValidationSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            message: error.details[0].message,
            error: true,
        });
    }
    else {
        next();
    }
};
exports.createCarValidation = createCarValidation;
const updateCarBodyValidationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).optional(),
    description: joi_1.default.string().min(3).max(500).optional(),
    amount: joi_1.default.number().min(0).optional(),
    price: joi_1.default.number().min(0).optional(),
    category: joi_1.default.string().hex().length(24).optional(),
    image: joi_1.default.string().uri().optional(),
    ownerId: joi_1.default.string().hex().length(24).optional(),
    isActive: joi_1.default.boolean().optional(),
});
const carIdSchema = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required(),
});
const updateCarValidation = (req, res, next) => {
    const { error: bodyError } = updateCarBodyValidationSchema.validate(req.body);
    const { error: paramError } = carIdSchema.validate(req.params);
    if (paramError) {
        res.status(400).json({
            message: paramError.details[0].message,
            error: true,
        });
    }
    if (bodyError) {
        res.status(400).json({
            message: bodyError.details[0].message,
            error: true,
        });
    }
    else {
        next();
    }
};
exports.updateCarValidation = updateCarValidation;
const deleteCarValidation = (req, res, next) => {
    const carIdSchema = joi_1.default.object({
        id: joi_1.default.string().hex().length(24).required(),
    });
    const { error } = carIdSchema.validate(req.params);
    if (error) {
        res.status(400).json({
            message: error.details[0].message,
            error: true,
        });
    }
    else {
        next();
    }
};
exports.deleteCarValidation = deleteCarValidation;
