import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
//import bcrypt from 'bcryptjs';
//import {TokenValidation} from "./../veriToken"

const prisma = new PrismaClient();
//const jwt = require('jsonwebtoken')

// Create a song and is inserted the playlistid
exports.create_song = async(req:Request,res:Response)=>{
    const { name, artist,album,year,genre,duration,namePlaylist } = req.body;
    const result = await prisma.song.create({
        data: {
          name: name,
          artist:artist,
          album:album,
          year:year,
          genre:genre,
          duration:duration,
          playlist: {connect: {name :namePlaylist}},
        },
    });
    return res.json(result);      
};


exports.get_songs = async(req:Request,res:Response)=>{
    const songs = await prisma.song.findMany();
    return res.json(songs);
};


// devuelve la lista de songs por id
exports.get_songs_id = async (req: Request,res: Response) => {
    const { id } = req.params;
    const { name, artist, album, year, genre, duration, playlistid } = req.body;
    const songs = await prisma.song.findFirst({
        where: {id: Number(id)}
       
    });
    res.json(songs);
};
    





