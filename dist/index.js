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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
dotenv_1.default.config();
app.get('/', (req, res) => {
    res.send('<h1>Hola</h1>');
});
app.post('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, date_born } = req.body;
    const passwordHash = yield bcryptjs_1.default.hash(password, 10);
    const result = yield prisma.usuario.create({
        data: {
            name: name,
            email: email,
            password: passwordHash,
            date_born: date_born
        },
    });
    return res.json(result);
}));
app.get('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.usuario.findMany();
    return res.json(users);
}));
app.post("/api/v1/users/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.usuario.findUnique({
        where: {
            email: email,
        }
    });
    if (!user)
        return res.status(400).json('Email or password is wrong');
    const checkPassword = bcryptjs_1.default.compareSync(password, user.password);
    if (!checkPassword)
        return res.status(400).json('Email or password is wrong');
    jwt.sign({ user: user }, process.env.TOKEN_SECRET, { expiresIn: '1h' }, (err, token) => {
        return res.json({
            token: token
        });
    });
}));
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }
    else {
        return res.status(403).json({
            "Token prueba": "Token vacío o aleatorio para acceso a canciones públicas",
            mensaje: "Genere token con su email y password en: /api/v1/users/login",
            token: "Genere token para acceso a canciones privadas y públicas"
        });
    }
    ;
}
;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('<h1>Hola<h1>');
}));
app.post('/api/v1/playlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, userEmail } = req.body;
    const result = yield prisma.playlist.create({
        data: {
            name: name,
            user: { connect: { email: userEmail } },
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
}));
app.get("/api/v1/songs", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs_all = yield prisma.song.findMany();
    const songs_public = yield prisma.song.findMany({
        where: { isxprivate: false },
    });
    return jwt.verify(req.token, process.env.TOKEN_SECRET, (error) => {
        if (error) {
            res.status(403).json(songs_public);
        }
        else {
            res.status(200).json(songs_all);
        }
    });
}));
app.get('/api/v1/songs/:id', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const songs = yield prisma.song.findFirst({
        where: { id: Number(id) }
    });
    return jwt.verify(req.token, process.env.TOKEN_SECRET, (error) => {
        if (songs === null || songs === void 0 ? void 0 : songs.isxprivate) {
            if (error) {
                res.status(403).json({ privado: 'token incorrecto' });
            }
            else {
                res.status(200).json(songs);
            }
        }
        else {
            res.status(200).json(songs);
        }
    });
}));
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
/*____________________________________________________________________*/
// import express, { Express, Request, Response } from 'express';
// //import { PrismaClient } from '@prisma/client'
// const user = require('./routes/user');
// const songs = require('./routes/songs');
// const playlist = require('./routes/playlist');
// const app: Express = express();
// const port = process.env.PORT;
// //const prisma = new PrismaClient();
// app.use(express.json());
// app.get('/',(req: Request,res: Response) => {
//     res.send('<h1>Express server</h1>');
// });
// // ------------- Methods User ----------------
// // Create the user
// app.post('/api/v1/users', user.create_user);
// // Show all the users with token
// app.get('/api/v1/users', user.get_users);
// // Verify token
// app.get('/api/v1/users/verifyToken', user.verify_token);
// // User login
// app.post('/api/v1/users/login', user.login);
// // ------------- Methods Playlist ----------------
// // Create the playlist with the user 
// app.post('/api/v1/playlist', playlist.create_playlist);
// // Show all the playlists with the songs
// app.get('/api/v1/playlist', playlist.get_playlists);
// // ------------- Methods Songs ----------------
// // Create the song with and is inserted the playlist
// app.post('/api/v1/songs', songs.create_song);
// // Show all the songs 
// app.get('/api/v1/songs', songs.get_songs);
// // Show the songs for id
// app.get('/api/v1/songs/:id', songs.get_songs_id);
// app.listen(port,() => {
//     console.log(`http://localhost:${port}`);
// })
