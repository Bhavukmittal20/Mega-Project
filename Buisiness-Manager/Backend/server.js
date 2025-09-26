import express from 'express';

import userRouter from './Routes/user.routes.js';
import cors from 'cors'

const port=8000
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/api/user',userRouter);
app.listen(port, () => console.log("Server started", port));
