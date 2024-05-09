import express from "express";
import { createPost, getPostOnCategory, getAllMyPosts, deleteMyPost } from "../controllers/post.js"
import {
    PostValidator, BypassChatValidator
} from "../lib/validators.js";
import { BypassNewChat } from "../controllers/chat.js";

const app = express.Router();

app.post("/newpost", PostValidator, createPost);
app.get("/getpost/:category", getPostOnCategory);
app.post("/directchat", BypassChatValidator, BypassNewChat);
app.get("/myposts/:id", getAllMyPosts);
app.delete("/delete/:postId",deleteMyPost);

export default app;
