import express, { Express, Request, Response } from 'express';
//import { PrismaClient } from '@prisma/client'


const user = require('./routes/user');
const songs = require('./routes/songs');
const playlist = require('./routes/playlist');

const app: Express = express();

const port = process.env.PORT;
//const prisma = new PrismaClient();

app.use(express.json());


// ------------- Methods User ----------------

// Create the user
app.post('/api/v1/users', user.create_user);
// Show all the users with token
app.get('/api/v1/users', user.get_users);
// User login
app.post('/api/v1/users/login', user.login);
 

// ------------- Methods Playlist ----------------

// Create the playlist with the user 
app.post('/api/v1/playlist', playlist.create_playlist);

// Show all the playlists with the songs
app.get('/api/v1/playlist', playlist.get_playlists);


// ------------- Methods Songs ----------------

// Create the song with and is inserted the playlist
app.post('/api/v1/songs', songs.create_song);

// Show all the songs 
app.get('/api/v1/songs', songs.get_songs);

// Show the songs for id
app.get('/api/v1/songs/:id', songs.get_songs_id);


app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})