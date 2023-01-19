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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('<h1>Hola</h1>');
});
app.post('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, date_born } = req.body;
    const result = yield prisma.usuario.create({
        data: {
            name: name,
            email: email,
            password: password,
            date_born: date_born
        },
    });
    return res.json(result);
}));
app.get('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.usuario.findMany();
    return res.json(users);
}));
app.post('/api/v1/playlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, user } = req.body;
    const result = yield prisma.playlist.create({
        data: {
            name: name,
            user: { connect: { id: user } },
        },
    });
    return res.json(result);
}));
app.get('/api/v1/playlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlists = yield prisma.playlist.findMany({
        include: { songs: true },
    });
    return res.json(playlists);
}));
app.post('/api/v1/songs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, artist, album, year, genre, duration, playlist } = req.body;
    const result = yield prisma.song.create({
        data: {
            name: name,
            artist: artist,
            album: album,
            year: year,
            genre: genre,
            duration: duration,
            playlist: { connect: { id: playlist } },
        },
    });
    return res.json(result);
}));
app.get('/api/v1/songs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield prisma.song.findMany();
    return res.json(songs);
}));
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
