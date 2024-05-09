import { TryCatch } from "../middlewares/error.js";
import { Post } from "../models/posts.js";
import { User } from "../models/user.js";
import {
    uploadFilesToCloudinary2,
} from "../utils/features.js";


const createPost = TryCatch(async (req, res) => {
    const { title, description, image, user, category } = req.body;
    const attachments = await uploadFilesToCloudinary2(image);
    console.log(attachments);
    const Myuser = await User.findById(user);
    const post = await Post.create({
        title,
        description,
        attachments: [...attachments],
        author: Myuser._id,
        category: category,
    });
    console.log(post);
    await post.save();

    return res.status(201).json({
        success: true,
        message: "Post Created Successfully",
    });
});




const getPostOnCategory = TryCatch(async (req, res) => {
    console.log("category", req.params.category);
    let posts;
    if (req.params.category === "all") {
        posts = await Post.find().populate("author", "name avatar _id");
    }
    else {
        posts = await Post.find({ category: req.params.category }).populate("author", "name avatar _id");
    }

    return res.status(200).json({
        success: true,
        data: posts,
    });
});

const getAllMyPosts = TryCatch(async (req, res) => {
    // console.log("id: ", req.params.id);
    const { id } = req.params;
    let posts = await Post.find({ author: id }).populate("author", "name avatar _id");
    console.log(posts);
    return res.status(200).json({
        success: true,
        data: posts,
    });
})

const deleteMyPost = TryCatch(async (req, res) => {
    console.log("id: ", req.params.postId);
    const { postId } = req.params;
    let post = await Post.findByIdAndDelete({ _id: postId })
    console.log("posts for del", post);
    if (post === null || post === undefined) {
        return res.status(404).json({
            success: false,
            message: "Post not found",
        });
    }
    else {
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    }
})

// const updatePost = TryCatch(async (req, res) => {
//     const { postId } = req.params;
//     const { title, description, image } = req.body;
//     let post = await Post.findByIdAndUpdate(post.image,{_id:postId},{});
//     post.title = title;
//     post.description = description;
//     await post.save();
//     return res.status(200).json({
//         success: true,
//         message: "Post updated successfully",
//     });
// })

// const updatePost = TryCatch(async (req, res) => {
//     const { postId } = req.params;
//     const { title, description, image } = req.body;

//     let post = await Post.findByIdAndUpdate({postId}, { title, description, image }, { new: true });
//     post.title = title;
//         post.description = description;
//         await post.save();
//         return res.status(200).json({
//             success: true,
//             message: "Post updated successfully",
//         });
// });

const updatePost = TryCatch(async (req, res) => {
    const { postId } = req.params;
    const { title, description, image } = req.body;
    //     let post = await Post.findById(postId);
    let post = await Post.findById(postId);
    let post2 = await Post.findByIdAndUpdate(postId, {
        title,
        description,
        image: image ? image : (post ? post.image : null)
    }, { new: true });

    // +    let post2 = await Post.findByIdAndUpdate(postId, { title, description, image: image ? image : post.image }, { new: true });
    // -    let post2 = await Post.findByIdAndUpdate(postId, { title, description, post.image }, { new: true });
    post.title = title;
    post.description = description;
    await post.save();
    return res.status(200).json({
        success: true,
        message: "Post updated successfully",
    });
});


export {
    getPostOnCategory,
    getAllMyPosts,
    deleteMyPost,
    createPost,
    updatePost,
};
