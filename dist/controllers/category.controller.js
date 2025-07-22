"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logicalDeleteCategory = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const category_model_1 = require("../models/category.model");
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.Category.find().populate("cars");
        res.status(200).json({
            message: "Categories retrieved successfully",
            error: false,
            data: categories,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategories = getCategories;
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.Category.findById(req.params.id).populate("cars");
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
                data: undefined,
            });
            return;
        }
        res.status(200).json({
            message: "Category retrieved successfully",
            error: false,
            data: category,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategory = getCategory;
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield category_model_1.Category.create(req.body);
        res.status(201).json({
            message: "Category created successfully",
            error: false,
            data: newCategory,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
                data: undefined,
            });
            return;
        }
        res.status(200).json({
            message: "Category updated successfully",
            error: false,
            data: category,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCategory = yield category_model_1.Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            res.status(404).json({
                message: "Category not found",
                error: true,
            });
            return;
        }
        res.status(200).json({
            message: "Category deleted successfully",
            error: false,
            data: deletedCategory,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;
const logicalDeleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!category) {
            res.status(404).json({
                message: "Category not found",
                error: true,
                data: undefined,
            });
            return;
        }
        res.status(200).json({
            message: "Category logically deleted successfully",
            error: false,
            data: category,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logicalDeleteCategory = logicalDeleteCategory;
