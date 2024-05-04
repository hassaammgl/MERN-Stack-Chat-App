import express from "express";
import { createPost, getAllPosts } from "../controllers/post.js"
import {
    PostValidator, BypassChatValidator
} from "../lib/validators.js";
import { BypassNewChat } from "../controllers/chat.js";

const app = express.Router();

app.post("/newpost", PostValidator, createPost);
app.get("/getall", getAllPosts);
app.post("/directchat", BypassChatValidator, BypassNewChat);

export default app;
