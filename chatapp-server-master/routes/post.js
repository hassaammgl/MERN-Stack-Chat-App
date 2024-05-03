import express from "express";
import {createPost} from "../controllers/post.js"
import {
    PostValidator
} from "../lib/validators.js";

const app = express.Router();

app.post("/newpost", PostValidator,createPost);

export default app;
