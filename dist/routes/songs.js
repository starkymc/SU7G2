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
//const jwt = require('jsonwebtoken')
// Create a song and is inserted the playlistid
exports.create_song = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, artist, album, year, genre, duration, isxprivate, namePlaylist } = req.body;
    const result = yield prisma.song.create({
        data: {
            name: name,
            artist: artist,
            album: album,
            year: year,
            genre: genre,
            duration: duration,
            isxprivate: isxprivate,
            playlist: { connect: { name: namePlaylist } },
        },
    });
    return res.json(result);
});
// con token denegna, pero autenticado no funciona xd
exports.get_songs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield prisma.song.findMany();
    return res.json(songs);
});
// devuelve la lista de songs por id
exports.get_songs_id = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, artist, album, year, genre, duration, playlistid, isprivate } = req.body;
    const songs = yield prisma.song.findFirst({
        where: { id: Number(id) }
    });
    res.json(songs);
});
