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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.create_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, date_born } = req.body;
    const passwordHash = yield bcryptjs_1.default.hash(password, 10);
    const result = yield prisma.usuario.create({
        data: {
            name: name,
            email: email,
            password: passwordHash,
            date_born: date_born
        },
    });
    // Retorna la informacion
    return res.status(201).json(result);
});
// 
exports.get_users = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Token Validation
    if (!req.headers.authorization) {
        return next(res.status(401).json('Access Denied'));
    }
    ;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(res.status(401).json('Access token is required'));
    }
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        const users = yield prisma.usuario.findMany();
        return next(res.json(users));
    }
    catch (_a) {
        return next(res.status(401).json('Access token is Incorrect'));
    }
    // const users = await prisma.usuario.findMany();
    // return res.json(users);
});
// User login
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.usuario.findUnique({
        where: {
            email: email,
        }
    });
    if (!user)
        return res.status(401).json('Email or password is wrong');
    const checkPassword = bcryptjs_1.default.compareSync(password, user.password);
    if (!checkPassword)
        return res.status(401).json('Email or password is wrong');
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
    });
    return res.status(201).json(token);
});
