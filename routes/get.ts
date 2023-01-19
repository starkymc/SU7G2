import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient();


// devuelve la lista de playlist en nuestra bd con songs de referencia
exports.get_playlist = async (req: Request,res: Response) => {
    const playlist = await prisma.playlist.findMany({
        select: {
            id: true,
            name: true,
            song: true,
            }
    });
    res.json(playlist);
};
