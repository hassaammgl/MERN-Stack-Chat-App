import express from "express";
import { createPost, getAllPosts } from "../controllers/post.js"
import {
    PostValidator
} from "../lib/validators.js";

const app = express.Router();

app.post("/newpost", PostValidator, createPost);
app.get("/getall", getAllPosts);

export default app;
