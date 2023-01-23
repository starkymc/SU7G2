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
// import { Request, Response, NextFunction } from "express";
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const jwt = require('jsonwebtoken');
// Create a song and is inserted the playlistid
exports.create_song = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, artist, album, year, genre, duration, isxprivate, namePlaylist } = req.body;
    const result = yield prisma.song.create({
        data: {
            name: name,
            artist: artist,
            album: album,
            year: year,
            genre: genre,
            duration: duration,
            isxprivate: isxprivate,
            playlist: { connect: { name: namePlaylist } },
        },
    });
    return res.json(result);
});
// exports.get_songs = async(req: Request,res: Response)=>{
//     const songs = await prisma.song.findMany();
//     return res.json(songs);
// };
// con token denegna, pero autenticado no funciona xd
// function verifyToken(req: any, res: Response, next: NextFunction){
//     const bearerHeader = req.headers['authorization'];
//     if(typeof bearerHeader !== 'undefined'){
//         const bearerToken = bearerHeader.split(" ")[1];
//         req.token = bearerToken;
//         next();
//     }else{
//         return res.json({
//           mensaje1:"Los usuarios autenticados pueden ver canciones privadas y públicas",
//           mensaje2:"Los usuarios no autenticados solo pueden ver canciones públicas",
//           nota: "Para ver canciones públicas, ingrese un token vacio o aleatorio",
//           token: "",
//         })
//     };
// };
// exports.get_songs = TokenValidation, async(req: any, res: Response)=>{
//     const songs_all = await prisma.song.findMany();
//     const songs_public= await prisma.song.findMany({
//         where: { isxprivate: false },
//       })
//     return jwt.verify(req.token , process.env.TOKEN_SECRET, (error: Response)=>{
//         if(error){
//             res.json(songs_public);
//         }else{
//             res.json(songs_all);
//         }
//     });
// };
exports.get_songs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const songs_all = await prisma.song.findMany();
    const nonprivate_songs = yield prisma.song.findMany({
        where: { isxprivate: false },
    });
    // const private_songs = await prisma.song.findMany({
    //     where: { isxprivate: true },
    //   });
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Token no enviado",
            'public songs': nonprivate_songs });
    }
    try {
        const { id } = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET);
        const private_songs = yield prisma.song.findMany({ where: { id, isxprivate: true } });
        res.json({ private_songs });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Token invalido",
            public_songs: nonprivate_songs });
    }
    //     return res.json({'songs public': public_songs,
    //     'enter your toke for more songs ': `${TokenValidation},
    //     ${private_songs}`
    // })
    //     app.use(TokenValidation)
    //     return jwt.verify(req.token , process.env.TOKEN_SECRET, (error: Response)=>{
    //         if(error){
    //             res.json(songs_public);
    //         }else{
    //             res.json(songs_all);
    //         }
    //     });
});
// exports.get_songs = async(req: Request,res: Response)=>{
//     const songs = await prisma.song.findMany();
//     return res.json(songs);
// };
// devuelve la lista de songs por id
exports.get_songs_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, artist, album, year, genre, duration, playlistid, isprivate } = req.body;
    const songs = yield prisma.song.findFirst({
        where: { id: Number(id) }
    });
    res.json(songs);
});
