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
exports.logicalDeleteCar = exports.deleteCar = exports.updateCar = exports.createCar = exports.getCarsByCategory = exports.getCar = exports.getCars = void 0;
const models_1 = require("../models");
const getCars = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield models_1.Car.find();
        res.status(200).json({
            message: "Cars retrieved successfully",
            error: false,
            data: cars,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCars = getCars;
const getCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield models_1.Car.findById(req.params.id);
        if (!car) {
            res.status(404).json({
                message: "Car not found",
                error: true,
                data: undefined,
            });
            return;
        }
        res.status(200).json({
            message: "Car retrieved successfully",
            error: false,
            data: car,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCar = getCar;
const getCarsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoty = yield models_1.Category.findById(req.params.id).populate("cars");
        if (!categoty) {
            res.status(404).json({
                message: "Cars not found",
                error: true,
                data: undefined,
            });
        }
        res.status(200).json({
            message: "Cars retrieved successfully",
            error: false,
            data: categoty === null || categoty === void 0 ? void 0 : categoty.cars,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getCarsByCategory = getCarsByCategory;
const createCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCar = yield models_1.Car.create(req.body);
        res.status(201).json({
            message: "Car created successfully",
            error: false,
            data: newCar,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createCar = createCar;
const updateCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield models_1.Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!car) {
            res.status(404).json({
                message: "Car not found",
                error: true,
                data: undefined,
            });
        }
        res.status(200).json({
            message: "Car updated successfully",
            error: false,
            data: car,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCar = updateCar;
const deleteCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield models_1.Car.findByIdAndDelete(req.params.id);
        if (!car) {
            res.status(404).json({
                message: "Car not found",
                error: true,
                data: undefined,
            });
        }
        res.status(200).json({
            message: "Car deleted successfully",
            error: false,
            data: car,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCar = deleteCar;
const logicalDeleteCar = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield models_1.Car.findByIdAndUpdate(req.params.id, { isActive: false }, // Establece la baja lógica
        { new: true });
        if (!car) {
            res.status(404).json({
                message: "Car not found",
                error: true,
                data: undefined,
            });
            return; // Añadido para evitar que continúe la ejecución
        }
        res.status(200).json({
            message: "Car logically deleted successfully",
            error: false,
            data: car,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logicalDeleteCar = logicalDeleteCar;
