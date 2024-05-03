import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

import { Post } from "../models/posts.js";
import {
    uploadFilesToCloudinary,
} from "../utils/features.js";

import { User } from "../models/user.js";

const createPost = TryCatch(async (req, res, next) => {
    const { name, members } = req.body;
    return res.status(201).json({
        success: true,
        message: "Group Created",
    });
});



// const sendAttachments = TryCatch(async (req, res, next) => {

//     const files = req.files || [];

//     if (files.length < 1)
//         return next(new ErrorHandler("Please Upload Attachments", 400));

//     if (files.length > 5)
//         return next(new ErrorHandler("Files Can't be more than 5", 400));


//     if (files.length < 1)
//         return next(new ErrorHandler("Please provide attachments", 400));

//     //   Upload files here
//     const attachments = await uploadFilesToCloudinary(files);
// });


export {
    createPost,
};
