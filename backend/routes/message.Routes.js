import express from "express"
import { protectRoute } from "../utils/protectRoute.js"
import { getConversation, getMessage, sendMessage } from "../controllers/message.controller.js"

export const messageRouter = express.Router()

messageRouter.post("/:id",protectRoute,sendMessage)
messageRouter.get("/:id",protectRoute,getMessage)
messageRouter.post("/",protectRoute,getConversation)
