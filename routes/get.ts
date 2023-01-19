import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient();

// devuelve la lista de songs 
exports.get_songs = async (req: Request,res: Response) => {
    const songs = await prisma.songs.findMany({
        select: {
            id: true,
            name: true,
            artist: true,
            album: true,
            year: true,
            genre: true,
            duration: true,
            privacy: true
            }
    });
    res.json(songs);
};

// devuelve la lista de songs por id
exports.get_songs_id = async (req: Request,res: Response) => {
    const { id } = req.params;
    const { name, artist, album, year, genre, duration, privacy } = req.body;
    const songs = await prisma.songs.findFirst({
        where: {id: Number(id)}
       
    });
    res.json(songs);
};

// devuelve la lista de playlist en nuestra bd con songs de referencia
exports.get_playlist = async (req: Request,res: Response) => {
    const playlist = await prisma.playlist.findMany({
        select: {
            id: true,
            name: true,
            usuario: {
                select: {
                    id: true
                }
            },
            song: true,
            }
    });
    res.json(playlist);
};



exports.get_users = async(req:Request,res:Response)=>{
    const users = await prisma.usuario.findMany();
    return res.json(users);
};