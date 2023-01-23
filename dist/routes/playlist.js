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
const client_1 = require("@prisma/client");
//import bcrypt from 'bcryptjs';
//import {TokenValidation} from "./../veriToken"
const prisma = new client_1.PrismaClient();
const jwt = require('jsonwebtoken');
// Create the playlist with the userid
exports.create_playlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { name, userEmail } = req.body;
        const result = yield prisma.playlist.create({
            data: {
                name: name,
                user: { connect: { email: userEmail } },
            },
        });
        return next(res.json(result));
    }
    catch (_a) {
        return next(res.status(401).json('Access token is Incorrect'));
    }
    // const { name, userEmail  } = req.body;
    // const result = await prisma.playlist.create({
    //     data: {
    //       name: name,
    //       user: {connect: {email :userEmail }},
    //     },
    // });
    // return res.json(result);      
});
// Show all the playlists with the songs
exports.get_playlists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const playlists = yield prisma.playlist.findMany({
            include: { songs: true },
        });
        return next(res.json(playlists));
    }
    catch (_b) {
        return next(res.status(401).json('Access token is Incorrect'));
    }
    // const playlists = await prisma.playlist.findMany({
    //     include: { songs: true },
    // });
    // return res.json(playlists);
});
