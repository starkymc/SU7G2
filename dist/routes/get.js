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
// devuelve la lista de songs 
exports.get_songs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield prisma.songs.findMany({
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
});
// devuelve la lista de songs por id
exports.get_songs_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, artist, album, year, genre, duration, privacy } = req.body;
    const songs = yield prisma.songs.findFirst({
        where: { id: Number(id) }
    });
    res.json(songs);
});
// devuelve la lista de playlist en nuestra bd con songs de referencia
exports.get_playlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlist = yield prisma.playlist.findMany({
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
});
exports.get_users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.usuario.findMany();
    return res.json(users);
});
