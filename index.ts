import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';


dotenv.config();


const app: Express = express();

const port = process.env.PORT;

app.use(express.json());

app.get('/',(req: Request,res: Response) => {
    res.send('<h1>Express server</h1>');
});

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

app.post('/api/v1/users', async(req,res)=>{
    const { name, email, password,date_born } = req.body;
    const result = await prisma.usuario.create({
        data: {
          name: name,
          email: email,
          password:password,
          date_born:date_born
        },
      });

      return res.json(result);      
    });




app.listen(port,() => {
    console.log(`http://localhost:${port}`);
})