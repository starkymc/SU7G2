import { PrismaClient } from "@prisma/client";
import { Request, Response ,NextFunction} from "express";
//import bcrypt from 'bcryptjs';
//import {TokenValidation} from "./../veriToken"

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')


// Create the playlist with the userid
exports.create_playlist = async(req:Request,res:Response,next:NextFunction)=>{

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
        const { name, userEmail  } = req.body;
        const result = await prisma.playlist.create({
            data: {
              name: name,
              user: {connect: {email :userEmail }},
            },
        });
        return next(res.json(result));
    }catch{
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
};

// Show all the playlists with the songs
exports.get_playlists = async(req:Request,res:Response,next:NextFunction)=>{

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
        const playlists = await prisma.playlist.findMany({
            include: { songs: true },
        });
        return next(res.json(playlists));
    }catch{
        return next(res.status(401).json('Access token is Incorrect'));
    }


    // const playlists = await prisma.playlist.findMany({
    //     include: { songs: true },
    // });
    // return res.json(playlists);
};