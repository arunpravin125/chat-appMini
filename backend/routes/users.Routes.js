import express from "express"
import { getUser, Login, Logout, signup } from "../controllers/Auth.controllers.js"
import { protectRoute } from "../utils/protectRoute.js"

export const usersRouter = express.Router()

usersRouter.post("/login",Login)
usersRouter.post("/signup",signup)
usersRouter.post("/logout",Logout )
usersRouter.post("/user",protectRoute,getUser)