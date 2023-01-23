"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// export const TokenValidation = function(req:Request,res:Response,next:NextFunction) {
function TokenValidation(req, res, next) {
    if (!req.headers.authorization) {
        return next(res.status(400).json('Access Denied'));
    }
    ;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(res.status(400).json('Access token is required'));
    }
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        return next();
    }
    catch (_a) {
        return next(res.status(400).json('Access token is Incorrect'));
    }
}
exports.TokenValidation = TokenValidation;
