<<<<<<< HEAD
import express, { Express, Request, Response,NextFunction} from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'
=======
import express, { Express, Request, Response } from 'express';
//import { PrismaClient } from '@prisma/client'
>>>>>>> main


const user = require('./routes/user');
const songs = require('./routes/songs');
const playlist = require('./routes/playlist');

const app: Express = express();

const port = process.env.PORT;
//const prisma = new PrismaClient();

app.use(express.json());

app.get('/',(req: Request,res: Response) => {
    res.send('<h1>Express server</h1>');
});


<<<<<<< HEAD
import {TokenValidation} from "./veriToken"

app.post('/api/v1/users', async(req,res)=>{
    const { name, email, password,date_born } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await prisma.usuario.create({
        data: {
          name: name,
          email: email,
          password:passwordHash,
          date_born:date_born
        },
    });
    const token = jwt.sign(result,process.env.TOKEN_SECRET,{
        expiresIn: "1h",
    });
    // return res.json(result);
    return res.status(201).json({result,token})
});

app.get('/api/v1/users', async(req:Request,res:Response)=>{
    const users = await prisma.usuario.findMany();
    return res.json(users);
})

app.post('/api/v1/playlist', async(req:Request,res:Response)=>{
    const { name, userEmail } = req.body;
    const result = await prisma.playlist.create({
        data: {
          name: name,
          user: {connect: {email :userEmail}},
        },
    });
    return res.json(result);      
});

app.get('/api/v1/playlist', async(req:Request,res:Response)=>{
    const playlists = await prisma.playlist.findMany({
        include: { 
            songs:  {
                select:{
                    id: true,
                    name: true,
                    artist: true ,
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
})

app.post('/api/v1/songs', async(req:Request,res:Response)=>{
    const { name, artist,album,year,genre,duration,privacy,namePlaylist } = req.body;
    const result = await prisma.song.create({
        data: {
          name: name,
          artist:artist,
          album:album,
          year:year,
          genre:genre,
          duration:duration,
          privacy:privacy,
          playlist: {connect: {name :namePlaylist}},
        },
    });
    return res.json(result);      
});



app.get('/api/v1/songs', async(req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers.authorization){
        const songs = await prisma.song.findMany({
            where:{privacy:false},
            select:{
                id: true,
                name: true,
                artist: true ,
                album: true,
                year: true,
                genre: true,
                duration: true,
                playlistid: true,
            }
        });
        return next(res.json(songs));
    };
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return next(res.status(400).json('Access token is required'))
    }
    try{
        jwt.verify(token,process.env.TOKEN_SECRET)            
        const songs = await prisma.song.findMany({
            select:{
                id: true,
                name: true,
                artist: true ,
                album: true,
                year: true,
                genre: true,
                duration: true,
                playlistid: true,
            }
        })
        return next(res.json(songs));
    }catch{
        return next(res.status(400).json('Access token is Incorrect'))
    }
});
=======
// ------------- Methods User ----------------

// Create the user
app.post('/api/v1/users', user.create_user);
// Show all the users with token
app.get('/api/v1/users', user.get_users);
// Verify token
app.get('/api/v1/users/verifyToken', user.verify_token);
// User login
app.post('/api/v1/users/login', user.login);


// ------------- Methods Playlist ----------------

// Create the playlist with the user 
app.post('/api/v1/playlist', playlist.create_playlist);

// Show all the playlists with the songs
app.get('/api/v1/playlist', playlist.get_playlists);
>>>>>>> main


// ------------- Methods Songs ----------------

<<<<<<< HEAD
    const user = await prisma.usuario.findUnique({
        where:{
            email :email,
        },

    })
    if (!user) return res.status(400).json('Email or password is wrong');
  
    const checkPassword = bcrypt.compareSync(password,user.password);
    if (!checkPassword) return res.status(400).json('Email or password is wrong');
  
    const token = jwt.sign(user,process.env.TOKEN_SECRET,{
      expiresIn: "1h",
    });
    return res.status(201).json(token);
})
=======
// Create the song with and is inserted the playlist
app.post('/api/v1/songs', songs.create_song);

// Show all the songs 
app.get('/api/v1/songs', songs.get_songs);

// Show the songs for id
app.get('/api/v1/songs/:id', songs.get_songs_id);
>>>>>>> main




app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})