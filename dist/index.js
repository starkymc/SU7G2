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
const cors_1 = __importDefault(require("cors"));
const jwt = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000']
}));
app.use(express_1.default.json());
dotenv_1.default.config();
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions_1 = require("./swaggerOptions");
app.get('/', (req, res) => {
    res.send('<h1>Hola</h1>');
});
// GRUPOS ENDPOINT
/**
 * @swagger
 * tags:
 *  name: Usuario
 *  description: Usuarios endpoint
 */
/**
 * @swagger
 * tags:
 *  name: Playlist
 *  description: Playlist endpoint
 */
// SWAGGER COMPONENT
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: int
 *          description: auto-generado
 *        email:
 *          type: string
 *          description: Email del usuario
 *        name:
 *          type: string
 *          description: Nombre del usuario
 *        password:
 *          type: string
 *          description: Contraseña del usuario
 *        last_session:
 *          type: string
 *          description: Autogenerado - Ultima sesion
 *        create_at:
 *          type: DateTime
 *          description: Autogenerado - Fecha de creacion
 *        date_born:
 *          type: string
 *          description: Fecha de nacimiento
 *      required:
 *        - email
 *        - name
 *        - password
 *      example:
 *        name: jorge
 *        email: jorge@gmail.com
 *        password: "1234"
 *
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Playlist:
 *      type: object
 *      properties:
 *        id:
 *          type: int
 *          description: auto-generado
 *        name:
 *          type: string
 *          description: Nombre de la playlist
 *        userId:
 *          type: string
 *          description: Id del usuario
 *        songs:
 *          type: string
 *          description: Id de la song
 *      required:
 *        - name
 *        - userId
 *      example:
 *        name: Playlist 8
 *        userEmail: admin@gmail.com
 *
 *
 */
// DOCUMENTACION
/**
 * @swagger
 * /api/v1/users:
 *  post:
 *    summary: Crea un nuevo usuario
 *    tags: [Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: El usuario fue creado
 *
 *
 *
 */
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
/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    summary: Muestra todos los usuarios
 *    tags: [Usuario]
 *    responses:
 *      200:
 *        description: Lista de usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *              example:
 *                id: 1,
 *                email: stark@example.com
 *                name: stark
 *                password: $2fdsf4343Ixfdsa4534
 *                last_session: 2023-01-21T02:26:10.720Z
 *                create_at: 2023-01-21T02:26:10.720Z
 *                date_born: null
 *
 *
 */
app.get('/api/v1/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.usuario.findMany();
    return res.json(users);
}));
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: Login del usuario
 *    tags: [Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            email: stark@example.com
 *            password: "3432"
 *    responses:
 *      200:
 *        description: Obtiene un token
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              properties:
 *                $ref: '#/components/schemas/User'
 *              required:
 *                - name
 *              example:
 *               token: ey64JdsGodfsdpfdsepeRWEpfDfpdfsFDPSfdsPF
 *
 *
 *
 *
 */
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
/**
 * @swagger
 * /api/v1/playlist:
 *  post:
 *    summary: Creacion de playlist
 *    tags: [Playlist]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Playlist'
 *    responses:
 *      200:
 *        description: La playlist fue creada
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              properties:
 *                $ref: '#/components/schemas/Playlist'
 *              required:
 *                - name
 *              example:
 *               id: 8
 *               name: Playlist 8
 *               userId: 3
 *
 *
 *
 *
 */
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
/**
 * @swagger
 * /api/v1/playlist:
 *  get:
 *    summary: Muestra todas las playlists
 *    tags: [Playlist]
 *    responses:
 *      200:
 *        description: Lista de las playlists
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Playlist'
 *              example:
 *                id : 5
 *                name: Playlist 5
 *                userId: 2
 *                songs: []
 *
 */
app.get('/api/v1/playlist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlists = yield prisma.playlist.findMany({
        include: { songs: true },
    });
    return res.json(playlists);
}));
/**
 * @swagger
 * /api/v1/songs:
 *  post:
 *    summary: Creacion de song
 *    tags: [Songs]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Songs'
 *    responses:
 *      200:
 *        description: La Cancion fue creada

 *
 *
 *
 *
 */
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
/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  security:
 *    - basicAuth: []
 *  schemas:
 *    Songs:
 *      type: object
 *      properties:
 *        id:
 *          type: int
 *          description: auto-generado
 *        name:
 *          type: string
 *          description: Nombre de la cancion
 *        artist:
 *          type: string
 *          description: Nombre del artista
 *        album:
 *          type: string
 *          description: Album
 *        year:
 *          type: int
 *          description: Año de lanzamiento
 *        genre:
 *          type: string
 *          description: Genero
 *        duration:
 *          type: int
 *          description: Duracion de la musica
 *        isxprivate:
 *          type: string
 *          description: Publico o privado
 *        playlist:
 *          type: string
 *          description: Nombre de la playlist
 *
 *      required:
 *        - name
 *        - artist
 *        - album
 *        - year
 *        - genre
 *        - duration
 *        - isxprivate
 *        - playlist
 *      example:
 *        name: Cancion
 *        artist: Artista
 *        album: Album
 *        year: 2022
 *        genre: Pop
 *        duration: 250
 *        isxprivate: true
 *        playlist: Playlist Carlos
 *
 *  parameters:
 *    songId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *        description: El id de la song
 *
 */
/**
 * @swagger
 * /api/v1/songs:
 *  get:
 *    summary: Muestra la lista de canciones ( Se necesita un token)
 *    tags: [Songs]
 *    responses:
 *      200:
 *        description: Lista de canciones
 *        content:
 *          application/json:
 *            schemas:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Songs'
 *
 *
 *
 */
app.get("/api/v1/songs", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        const songs = yield prisma.song.findMany({
            where: { isxprivate: false },
        });
        return next(res.json(songs));
    }
    ;
    const token = req.headers.authorization.split(' ')[1];
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        const songs = yield prisma.song.findMany();
        return next(res.json(songs));
    }
    catch (_a) {
        return next(res.status(401).json('Access token is Incorrect'));
    }
    // const songs_all = await prisma.song.findMany();
    // const songs_public = await prisma.song.findMany({
    //     where: { isxprivate: false },
    //   })
    // return jwt.verify(req.token , process.env.TOKEN_SECRET, (error: Response)=>{
    //     if(error){
    //         res.status(403).json(songs_public);
    //     }else{
    //         res.status(200).json(songs_all);
    //     }
    // });
}));
/**
 * @swagger
 * /api/v1/songs/{id}:
 *  get:
 *    summary: Obtiene una cancion por id ( Se necesita un token)
 *    tags: [Songs]
 *    parameters:
 *      - $ref: '#/components/parameters/songId'
 *    responses:
 *      200:
 *        description: Se obtuvo la cancion
 *        content:
 *          application/json:
 *            schemas:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Songs'
 *      404:
 *        description: La cancion no fue encontrada
 *
 *
 *
 */
app.get('/api/v1/songs/:id', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const songs = yield prisma.song.findFirst({
        where: { id: Number(id) }
    });
    return jwt.verify(req.token, process.env.TOKEN_SECRET, (error) => {
        if (songs === null || songs === void 0 ? void 0 : songs.isxprivate) {
            if (error) {
                res.status(403).json({ privado: 'Esta cancion es privada necesitas un token verificado' });
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
// Ruta Swagger
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.options);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
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
