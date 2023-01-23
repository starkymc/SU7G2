"use strict";
// import { PrismaClient } from "@prisma/client";
// import { Request, Response, NextFunction } from "express";
// //import bcrypt from 'bcryptjs';
// // import {TokenValidation} from "./../veriToken"
// import {TokenValidation} from "./../veriToken"
// const prisma = new PrismaClient();
// const jwt = require('jsonwebtoken')
// // Create a song and is inserted the playlistid
// exports.create_song = async(req:Request, res:Response)=>{
//     const { name, artist, album, year, genre, duration, isxprivate, namePlaylist} = req.body;
//     const result = await prisma.song.create({
//         data: {
//           name: name,
//           artist: artist,
//           album: album,
//           year: year,
//           genre: genre,
//           duration: duration,
//           isxprivate: isxprivate,
//           playlist: {connect: {name: namePlaylist}},
//         },
//     });
//     return res.json(result);      
// };
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
// exports.get_songs = verifyToken, async(req: any, res: Response)=>{
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
// // exports.get_songs = async(req: Request,res: Response)=>{
// //     const songs = await prisma.song.findMany();
// //     return res.json(songs);
// // };
// // devuelve la lista de songs por id
// exports.get_songs_id = async (req: Request,res: Response) => {
//     const { id } = req.params;
//     const { name, artist, album, year, genre, duration, playlistid, isprivate } = req.body;
//     const songs = await prisma.song.findFirst({
//         where: {id: Number(id)}
//     });
//     res.json(songs);
// };
