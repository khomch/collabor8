"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// import router from './router';
dotenv_1.default.config();
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SECRET = process.env.SECRET || 'secret';
const corsConfig = {
    credentials: true,
    origin: true
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.use(router);
const server = app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});
server.on('error', (error) => {
    console.log('Server error: ', error);
});
