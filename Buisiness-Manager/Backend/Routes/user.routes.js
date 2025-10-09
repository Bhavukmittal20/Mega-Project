import {login, SignUp} from "../controllers/user.controller.js";
import express from 'express'
const userRouter=express.Router();
userRouter.post('/login-otp',login)
userRouter.post('/signup-otp',SignUp)
export default userRouter;