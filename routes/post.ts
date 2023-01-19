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


exports.create_user = async(req: Request,res: Response)=>{
    const { name, email, password,date_born } = req.body;
    const result = await prisma.usuario.create({
        data: {
          name: name,
          email: email,
          password:password,
          date_born:date_born
        },
      });
      return res.json(result);      
    };
