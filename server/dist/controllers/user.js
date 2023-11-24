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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
// TODO import user model
const PRIVATE_KEY = process.env.PRIVATE_KEY;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const existingUser = 'user' /* TODO find user in the DB */;
            if (existingUser) {
                return res.status(409).send({ message: 'Username already exist' });
            }
            const salt = yield bcrypt_1.default.genSalt();
            const passwordHash = yield bcrypt_1.default.hash(password, salt);
            const newUser = 'new user' /* TODO create new user and save it in DB */;
            // const token = jwt.sign({ userId: newUser._id, username: newUser.username }, PRIVATE_KEY);
            // res.cookie('accessToken', token);
            res.status(201).send({ username });
        }
        catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Internal Server Error: ' });
        }
    });
}
exports.default = { register };
