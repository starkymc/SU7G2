import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'

dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();

const port = process.env.PORT;

app.use(express.json());

app.get('/',(req: Request,res: Response) => {
    res.send('<h1>Express server</h1>');
});

import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken')


app.post('/api/v1/users', async(req,res)=>{
    const { name, email, password,date_born } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await prisma.usuario.create({
        data: {
          name: name,
          email: email,
          password:passwordHash,
          date_born:date_born
        },
    });
    const token = jwt.sign(result,process.env.TOKEN_SECRET,{
        expiresIn: "1h",
    });
    // return res.json(result);
    return res.status(201).json({result,token})
});

app.get('/api/v1/users', async(req:Request,res:Response)=>{
    const users = await prisma.usuario.findMany();
    return res.json(users);
})

app.post('/api/v1/playlist', async(req:Request,res:Response)=>{
    const { name, userEmail } = req.body;
    const result = await prisma.playlist.create({
        data: {
          name: name,
          user: {connect: {email :userEmail}},
        },
    });
    return res.json(result);      
});

app.get('/api/v1/playlist', async(req:Request,res:Response)=>{
    const playlists = await prisma.playlist.findMany({
        include: { songs: true },
    });
    return res.json(playlists);
})

app.post('/api/v1/songs', async(req:Request,res:Response)=>{
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
});


app.get('/api/v1/songs', async(req:Request,res:Response)=>{
    const songs = await prisma.song.findMany();
    return res.json(songs);
})


app.post('/api/v1/users/login', async(req:Request,res:Response)=>{
    const {email,password }= req.body;

    const user = await prisma.usuario.findUnique({
        where:{
            email :email,
        }
    })
    if (!user) return res.status(400).json('Email or password is wrong');
  
    const checkPassword = bcrypt.compareSync(password,user.password);
    if (!checkPassword) return res.status(400).json('Email or password is wrong');
  
    const token = jwt.sign(user,process.env.TOKEN_SECRET,{
      expiresIn: "1h",
    });
    return res.status(201).json(token);
})

import {TokenValidation} from "./veriToken"

app.get('/a',TokenValidation,(req: Request,res: Response) => {
  res.send('<h1>Express server</h1>');
});




app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})