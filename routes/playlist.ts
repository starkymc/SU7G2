import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
//import bcrypt from 'bcryptjs';
//import {TokenValidation} from "./../veriToken"

const prisma = new PrismaClient();
//const jwt = require('jsonwebtoken')


// Create the playlist with the userid
exports.create_playlist = async(req:Request,res:Response)=>{
    const { name, userEmail  } = req.body;
    const result = await prisma.playlist.create({
        data: {
          name: name,
          user: {connect: {email :userEmail }},
        },
    });
    return res.json(result);      
};

// Show all the playlists with the songs
exports.get_playlists = async(req:Request,res:Response)=>{
    const playlists = await prisma.playlist.findMany({
        include: { songs: true },
    });
    return res.json(playlists);
};