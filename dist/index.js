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
    res.send('<h1>Express server</h1>');
});
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = require('jsonwebtoken');
const veriToken_1 = require("./veriToken");
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
    const token = jwt.sign(result, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
    });
    // return res.json(result);
    return res.status(201).json({ result, token });
}));
app.get('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.usuario.findMany();
    return res.json(users);
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
        include: {
            songs: {
                select: {
                    id: true,
                    name: true,
                    artist: true,
                    album: true,
                    year: true,
                    genre: true,
                    duration: true,
                    playlistid: true,
                }
            }
        },
    });
    return res.json(playlists);
}));
app.post('/api/v1/songs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, artist, album, year, genre, duration, privacy, namePlaylist } = req.body;
    const result = yield prisma.song.create({
        data: {
            name: name,
            artist: artist,
            album: album,
            year: year,
            genre: genre,
            duration: duration,
            privacy: privacy,
            playlist: { connect: { name: namePlaylist } },
        },
    });
    return res.json(result);
}));
app.get('/api/v1/songs', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        const songs = yield prisma.song.findMany({
            where: { privacy: false },
            select: {
                id: true,
                name: true,
                artist: true,
                album: true,
                year: true,
                genre: true,
                duration: true,
                playlistid: true,
            }
        });
        return next(res.json(songs));
    }
    ;
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(res.status(400).json('Access token is required'));
    }
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        const songs = yield prisma.song.findMany({
            select: {
                id: true,
                name: true,
                artist: true,
                album: true,
                year: true,
                genre: true,
                duration: true,
                playlistid: true,
            }
        });
        return next(res.json(songs));
    }
    catch (_a) {
        return next(res.status(400).json('Access token is Incorrect'));
    }
}));
app.post('/api/v1/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.usuario.findUnique({
        where: {
            email: email,
        },
    });
    if (!user)
        return res.status(400).json('Email or password is wrong');
    const checkPassword = bcryptjs_1.default.compareSync(password, user.password);
    if (!checkPassword)
        return res.status(400).json('Email or password is wrong');
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
    });
    return res.status(201).json(token);
}));
app.get('/a', veriToken_1.TokenValidation, (req, res) => {
    res.send('<h1>Express server</h1>');
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
