"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserValidation = exports.updateUserValidation = exports.createUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const createUserBodyValidationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required(),
    lastname: joi_1.default.string().required(),
    birthdate: joi_1.default.date().required(),
    email: joi_1.default.string()
        .pattern(emailPattern)
        .message("Ingrese un email válido")
        .required(),
    password: joi_1.default.string().min(4).max(20).required(),
    isAdmin: joi_1.default.boolean().optional().default(false),
    isActive: joi_1.default.boolean().optional().default(true),
});
const createUserValidation = (req, res, next) => {
    const { error } = createUserBodyValidationSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            message: error.details[0].message,
            error: true,
        });
    }
    next();
};
exports.createUserValidation = createUserValidation;
const updateUserBodyValidationSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).optional(),
    lastname: joi_1.default.string().optional(),
    birthdate: joi_1.default.date().iso().required(),
    email: joi_1.default.string()
        .pattern(emailPattern)
        .message("Ingrese un email válido")
        .optional(),
    isAdmin: joi_1.default.boolean().optional(),
    isActive: joi_1.default.boolean().optional(),
});
const userParamValidationSchema = joi_1.default.object({
    id: joi_1.default.string().hex().length(24).required(),
});
const updateUserValidation = (req, res, next) => {
    const { error: bodyError } = updateUserBodyValidationSchema.validate(req.body);
    const { error: paramError } = userParamValidationSchema.validate(req.params);
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
exports.updateUserValidation = updateUserValidation;
const deleteUserValidation = (req, res, next) => {
    const { error } = userParamValidationSchema.validate(req.params);
    if (error) {
        res.status(400).json({
            message: error.details[0].message,
            error: true,
        });
    }
    next();
};
exports.deleteUserValidation = deleteUserValidation;
