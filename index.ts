import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const get = require('./routes/get');
const post = require('./routes/post');

const app: Express = express();


const port = process.env.PORT;

app.use(express.json());

app.get('/',(req: Request,res: Response) => {
    res.send('<h1>Express server</h1>');
});


// ------------- Metodos Get ----------------

// Show the playlist with the user and the song
app.get('/get_playlist', get.get_playlist);
// Show all the songs
app.get('/get_songs', get.get_songs);
// Show all the users
app.get('/get_users', get.get_users);
// Show the songs for id
app.get('/get_songs/:id', get.get_songs_id);


// ---------------- Metodos Post ----------------

// Create a user
app.post("/create_user", post.create_user);
//Create a song
app.post("/create_song", post.create_song);
// Create a playlist with the userid and the songid
app.post("/create_playlist", post.create_playlist);

app.post("/login", post.login);








app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})