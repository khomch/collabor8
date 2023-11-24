"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./controllers/user"));
// import { authMiddleware } from './middlewares/auth';
const router = (0, express_1.Router)();
router.post('/user/register', user_1.default.register);
// router.post('/user/login', userCtrl.login);
// router.post('/user/logout', authMiddleware , userCtrl.logout);
