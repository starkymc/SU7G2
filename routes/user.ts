// import { PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";
// import bcrypt from 'bcryptjs';

// import {TokenValidation} from "./../veriToken"

// const prisma = new PrismaClient();
// const jwt = require('jsonwebtoken')


// import dotenv from 'dotenv';
// dotenv.config();

// exports.create_user =  async(req: Request,res: Response)=>{
//     const { name, email, password,date_born } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);
//     const result = await prisma.usuario.create({
//         data: {
//           name: name,
//           email: email,
//           password:passwordHash,
//           date_born:date_born
//         },
//     }); 
//     // Retorna la informacion
//     return res.status(201).json({result})
// };

// // 
// exports.get_users = async(req:Request,res:Response)=>{
//     const users = await prisma.usuario.findMany();
//     return res.json(users);
// };







// // User login
// exports.login = async(req:Request,res:Response)=>{
//     const {email,password } = req.body;

//     const user = await prisma.usuario.findUnique({
//         where:{
//             email :email,
//         }
//     })
//     if (!user) return res.status(400).json('Email or password is wrong');
  
//     const checkPassword = bcrypt.compareSync(password,user.password);
//     if (!checkPassword) return res.status(400).json('Email or password is wrong');
  
//     // const token = jwt.sign(user,process.env.TOKEN_SECRET,{
//     //   expiresIn: "1h",
//     // });
//     jwt.sign({user: user}, process.env.TOKEN_SECRET, {expiresIn: '1h'}, (err: Response, token: Response)=>{
//         return res.json({
//             token: token
//         });
//     });
//     // return res.status(201).json(token);
// };


// exports.verify_token = TokenValidation,(req: Request,res: Response) => {
//     res.send('<h1>Express server</h1>');
// };