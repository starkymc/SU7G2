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


// Metodos Get
app.get('/get_playlist', get.get_playlist);


// Metodos Post
app.post("/create_song", post.create_song);

app.post("/create_playlist", post.create_playlist);





app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})