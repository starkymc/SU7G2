import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';


dotenv.config();

//const prisma = new PrismaClient();

const app: Express = express();
//const app = express();

const port = process.env.PORT;

app.use(express.json());

app.get('/',(req: Request,res: Response) => {
    res.send('<h1>Express server</h1>');
});







app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})