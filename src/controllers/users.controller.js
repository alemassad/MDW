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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logicalDeleteUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.getUserByEmail = exports.createUser = exports.controller = void 0;
const models_1 = require("../models");
const firebase_1 = __importDefault(require("../config/firebase"));
const controller = (req, res) => {
    const { name } = req.params;
    res.json({ user: name });
};
exports.controller = controller;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password } = _a, restBody = __rest(_a, ["password"]);
    const formatedDate = new Date(req.body.birthdate);
    try {
        const { uid } = yield firebase_1.default.auth().createUser({
            email: req.body.email,
            password,
        });
        const newUser = yield models_1.User.create(Object.assign(Object.assign({}, restBody), { firebaseUid: uid, birthdate: formatedDate, isActive: true }));
        res.status(201).json({
            message: "User created successfully",
            data: newUser,
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getUserByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({
                message: "User not found",
                error: true,
                data: undefined,
            });
            return;
        }
        res.status(200).json({
            message: "User retrieved successfully",
            error: false,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByEmail = getUserByEmail;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        let users;
        if (name) {
            users = yield models_1.User.find({
                name: { $regex: new RegExp(name, "i") },
            });
        }
        else {
            users = yield models_1.User.find();
        }
        res.status(200).json({
            message: "Users retrieved successfully",
            error: false,
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findById(req.params.id);
        if (!user) {
            res.status(404).json({
                message: "User not found",
                error: true,
                data: undefined,
            });
            return;
        }
        res.status(200).json({
            message: "User retrieved successfully",
            error: false,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const birthdate = req.body.birthdate ? new Date(req.body.birthdate) : undefined;
    try {
        const updateData = Object.assign({}, req.body);
        if (birthdate)
            updateData.birthdate = birthdate;
        // Busca el usuario actual
        const userBefore = yield models_1.User.findById(req.params.id);
        if (!userBefore) {
            res.status(404).json({
                message: "User not found",
                error: true,
                data: undefined,
            });
            return;
        }
        const user = yield models_1.User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });
        res.status(200).json({
            message: "User updated successfully",
            data: user,
            error: false,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({
                message: "User not found",
                error: true,
                data: undefined,
            });
            return;
        }
        res.status(200).json({
            message: "User deleted successfully",
            error: false,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const logicalDeleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
        if (!user) {
            res.status(404).json({
                message: "User not found",
                error: true,
                data: undefined,
            });
            return;
        }
        res.status(200).json({
            message: "User logically deleted successfully",
            error: false,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.logicalDeleteUser = logicalDeleteUser;
