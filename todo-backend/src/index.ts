import express, { Express, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import todoRoute from './routes/todo';
import userRoute from './routes/user';
const prisma = new PrismaClient()
const app: Express = express();
const port = 3000;

app.use(express.json());
app.use('/todo',todoRoute);
app.use('/user',userRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});