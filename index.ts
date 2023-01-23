import express, { NextFunction, Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
dotenv.config();
app.get('/',(req: Request,res: Response) => {
    res.send('<h1>Hola</h1>');
});
app.post('/api/v1/users', async(req: any, res: Response)=>{
    const { name, email, password, date_born } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await prisma.usuario.create({
        data: {
          name: name,
          email: email,
          password: passwordHash,
          date_born: date_born
        },
      });
      return res.json(result);      
    });

app.get('/api/v1/users', async(req: Request, res: Response)=>{
    const users = await prisma.usuario.findMany();
    return res.json(users);
})
app.post("/api/v1/users/login", async(req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.usuario.findUnique({
    where: {
      email: email,
    }
  })
  if (!user) return res.status(400).json('Email or password is wrong');
  const checkPassword = bcrypt.compareSync(password, user.password);
  if (!checkPassword) return res.status(400).json('Email or password is wrong');
  jwt.sign({user: user}, process.env.TOKEN_SECRET, {expiresIn: '1h'}, (err: Response, token: Response)=>{
      return res.json({
          token: token
      });
  });
});
function verifyToken(req: any, res: Response, next: NextFunction){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      next();
  }else{
      return res.status(403).json({
        "Token prueba": "Token vacío o aleatorio para acceso a canciones públicas",
        mensaje: "Genere token con su email y password en: /api/v1/users/login",
        token: "Genere token para acceso a canciones privadas y públicas"
      });
  };
};
app.get('/', async(req: Request, res: Response)=>{
  res.send('<h1>Hola<h1>');
});

app.post('/api/v1/playlist', async(req: Request, res: Response)=>{
    const { name, userEmail } = req.body;
    const result = await prisma.playlist.create({
        data: {
          name: name,
          user: {connect: {email: userEmail}},
        },
      });
      return res.json(result);      
    });

app.get('/api/v1/playlist', async(req: Request, res: Response)=>{
    const playlists = await prisma.playlist.findMany({
        include: { songs: true },
    });
    return res.json(playlists);
})

app.post('/api/v1/songs', async(req: Request, res: Response)=>{
    const { name, artist, album, year, genre, duration, isxprivate, namePlaylist } = req.body;
    const result = await prisma.song.create({
        data: {
          name: name,
          artist: artist,
          album: album,
          year: year,
          genre: genre,
          duration: duration,
          isxprivate: isxprivate,
          playlist: {connect: {name: namePlaylist}},
        },
      });
      return res.json(result);      
    });
app.get("/api/v1/songs",  verifyToken, async(req: any, res: Response)=>{
    const songs_all = await prisma.song.findMany();
    const songs_public = await prisma.song.findMany({
        where: { isxprivate: false },
      })
    return jwt.verify(req.token , process.env.TOKEN_SECRET, (error: Response)=>{
        if(error){
            res.status(403).json(songs_public);
        }else{
            res.status(200).json(songs_all);
        }
    });
});
app.get('/api/v1/songs/:id', verifyToken, async(req: any, res: Response)=>{
  const { id } = req.params;
  const songs = await prisma.song.findFirst({
    where: { id: Number(id)}
  });
  return jwt.verify(req.token, process.env.TOKEN_SECRET, (error: Response)=>{
    if(songs?.isxprivate){
      if(error){
        res.status(403).json({privado:'token incorrecto'});
      }else{
        res.status(200).json(songs);
      }
    }else{
      res.status(200).json(songs);
    } 
  });
});
app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})



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