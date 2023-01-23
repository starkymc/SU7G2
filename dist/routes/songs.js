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
// Create a song and is inserted the playlistid
exports.create_song = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { name, artist, album, year, genre, duration, privacy, namePlaylist } = req.body;
        const result = yield prisma.song.create({
            data: {
                name: name,
                artist: artist,
                album: album,
                year: year,
                genre: genre,
                duration: duration,
                privacy: privacy,
                playlist: { connect: { name: namePlaylist } },
            },
        });
        return next(res.json(result));
    }
    catch (_a) {
        return next(res.status(401).json('Access token is Incorrect'));
    }
    // const { name, artist,album,year,genre,duration,privacy,namePlaylist } = req.body;
    // const result = await prisma.song.create({
    //     data: {
    //       name: name,
    //       artist:artist,
    //       album:album,
    //       year:year,
    //       genre:genre,
    //       duration:duration,
    //       privacy:privacy,
    //       playlist: {connect: {name :namePlaylist}},
    //     },
    // });
    // return res.json(result);
});
exports.get_songs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Token Validation
    if (!req.headers.authorization) {
        const songs = yield prisma.song.findMany({
            where: { privacy: false },
        });
        return next(res.json(songs));
    }
    ;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(res.status(401).json('Access token is required'));
    }
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        const songs = yield prisma.song.findMany();
        return next(res.json(songs));
    }
    catch (_b) {
        return next(res.status(401).json('Access token is Incorrect'));
    }
    // const songs = await prisma.song.findMany();
    // return res.json(songs);
});
// Devuelve la lista de songs por id
exports.get_songs_id = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Token Validation
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
        const { id } = req.params;
        const songs = yield prisma.song.findUnique({
            where: { id: Number(id) }
        });
        return next(res.json(songs));
    }
    catch (_c) {
        return next(res.status(400).json('Access token is Incorrect'));
    }
    // const { id } = req.params;
    // const songs = await prisma.song.findUnique({
    //     where: {id: Number(id)}       
    // });
    // return res.json(songs);
});
