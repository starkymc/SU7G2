"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Ruta create_song - Permite crear song 
exports.create_song = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, artist, album, year, genre, duration } = req.body;
    const song = yield prisma.songs.create({
        data: {
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
});
// Ruta create_playlist - Permite crear playlist y agregarle un cancion x id 
exports.create_playlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, song } = req.body;
    const playlist = yield prisma.playlist.create({
        data: {
            name: name,
            song: { connect: { id: song } }
        },
    });
    console.log(`Playlist creada\n name: ${name} \n `);
    res.json(playlist);
});
