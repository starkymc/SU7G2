import { PrismaClient } from "@prisma/client";
import { Request, Response,NextFunction } from "express";
//import bcrypt from 'bcryptjs';
//import {TokenValidation} from "./../veriToken"

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')

// Create a song and is inserted the playlistid
exports.create_song = async(req:Request,res:Response,next:NextFunction)=>{
    
    // Token Validation
    if(!req.headers.authorization){
        return next(res.status(401).json('Access Denied'));
    };
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(res.status(401).json('Access token is required'));
    }
    try{
        jwt.verify(token,process.env.TOKEN_SECRET);
        const { name, artist,album,year,genre,duration,privacy,namePlaylist } = req.body;
        const result = await prisma.song.create({
            data: {
              name: name,
              artist:artist,
              album:album,
              year:year,
              genre:genre,
              duration:duration,
              privacy:privacy,
              playlist: {connect: {name :namePlaylist}},
            },
        });
        return next(res.json(result));
    }catch{
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
};

exports.get_songs = async(req:Request,res:Response,next:NextFunction)=>{

    // Token Validation
    if(!req.headers.authorization){
        const songs = await prisma.song.findMany({
            where:{privacy:false},
        });
        return next(res.json(songs));
    };
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(res.status(401).json('Access token is required'));
    }
    try{
        jwt.verify(token,process.env.TOKEN_SECRET);
        const songs = await prisma.song.findMany();
        return next(res.json(songs));
    }catch{
        return next(res.status(401).json('Access token is Incorrect'));
    }

    // const songs = await prisma.song.findMany();
    // return res.json(songs);
};


// Devuelve la lista de songs por id
exports.get_songs_id = async (req: Request,res: Response,next:NextFunction) => {

    // Token Validation
    if(!req.headers.authorization){
        return next(res.status(400).json('Access Denied'));
    };
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(res.status(400).json('Access token is required'));
    }
    try{
        jwt.verify(token,process.env.TOKEN_SECRET);
        const { id } = req.params;
        const songs = await prisma.song.findUnique({
            where: {id: Number(id)}       
        });
        return next(res.json(songs));
    }catch{
        return next(res.status(400).json('Access token is Incorrect'));
    }
    
    // const { id } = req.params;
    // const songs = await prisma.song.findUnique({
    //     where: {id: Number(id)}       
    // });
    // return res.json(songs);
};
    





