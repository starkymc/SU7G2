import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";



const prisma = new PrismaClient();

// Ruta create_song - Permite crear song 
exports.create_song = async (req: Request,res: Response) => {
    const { name, artist,album,year,genre,duration } = req.body;
    const song = await prisma.songs.create({
        data: 
            {
            name: name,
            artist: artist,
            album: album,
            year: year,
            genre: genre,
            duration: duration
        },
    });
    console.log(`Cancion creada\n name: ${name} \n `);
    res.json(song);
};

// Ruta create_playlist - Permite crear playlist y agregarle un cancion x id 

exports.create_playlist = async (req:Request, res:Response ) => {
    const { id,name,usuario,song } = req.body;
    const playlist = await prisma.playlist.create({
        data: 
            {
            id: id,
            name: name,
            usuario: { connect: { id: usuario}},
            song: { connect: {id: song}}
        },
    });
    console.log(`Playlist creada\n name: ${name} \n `);
    res.json(playlist);
}

// Crea el usuario con contraseña encriptada
exports.create_user = async(req: Request,res: Response)=>{
    const { name, email, password,date_born } = req.body;
    //Encriptando la contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await prisma.usuario.create({
        data: {
          name: name,
          email: email,
          password: passwordHash,
          date_born:date_born
        },
      });
      return res.json(result);      
    };

// Login
exports.login = async(req: Request,res: Response)=>{
        const { email, password } = req.body;
        const user = await prisma.usuario.findFirst({
            where: {
                email: String(email)   
                },
            });

            if (!user){
                return res.status(400).json({message:'El email no existe' });
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(400).json({message: 'Contraseña incorrecta' });
            }
    
        return res.json({message: 'Iniciaste sesion'});
        
    };
    