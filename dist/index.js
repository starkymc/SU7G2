"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const get = require('./routes/get');
const post = require('./routes/post');
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('<h1>Express server</h1>');
});
// Metodos Get
app.get('/get_playlist', get.get_playlist);
// Metodos Post
app.post("/create_song", post.create_song);
app.post("/create_playlist", post.create_playlist);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
