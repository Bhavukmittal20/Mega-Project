import {login} from "../controllers/user.controller.js";
import express from 'express'
const userRouter=express.Router();
userRouter.post('/login-otp',login)

export default userRouter;