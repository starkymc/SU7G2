import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken')

import dotenv from "dotenv";
dotenv.config();

export function TokenValidation(req:Request,res:Response,next:NextFunction) {
    if(!req.headers.authorization){
        return next(res.status(400).json('Access Denied'))
    };
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(res.status(400).json('Access token is required'))
    }
    try{
        jwt.verify(token,process.env.TOKEN_SECRET)            
        next();
    }catch{
        return next(res.status(400).json('Access token is Incorrect'))
    }
}