import express from "express";
import createUser from "../application/user";

const userRouter = express.Router();

userRouter.post("/", createUser);

export default userRouter;