import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter Username").notEmpty(),
  body("bio", "Please Enter Bio").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const loginValidator = () => [
  body("username", "Please Enter Username").notEmpty(),
  body("password", "Please Enter Password").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("userId", "Please Enter User ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
];

const chatIdValidator = () => [param("id", "Please Enter Chat ID").notEmpty()];

const renameValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
  body("secretKey", "Please Enter Secret Key").notEmpty(),
];

const PostValidator = (req, res, next) => {
  const { title, description, image, user, category } = req.body;
  if (!title || !description || !user || !category) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Title, Description and User",
    });
  }
  if (image.length > 5) {
    return res.status(400).json({
      success: false,
      message: "Max 5 images are allowed",
    })
  }
  if (image.length < 0) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Image",
    })
  }
  next();
}

const BypassChatValidator = async (req, res, next) => {
  console.log("BypassChatValidator");
  const { name, members } = req.body;
  if (!name || !members) {
    return res.status(400).json({
      success: false,
      message: "Please Enter Name and Members",
    });
  }
 

  if (members[0].toString() === members[1].toString()) {
    return res.status(400).json({
      success: false,
      message: "You cannot add same user in a chat",
    });
  }
  if (members.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Chat must have at least 2 members",
    })
  }
  const allChats = await Chat.find({});

  // <<<<<<<<<<<<<<  ✨ Codeium Command ⭐ >>>>>>>>>>>>>>>>
  const chatsWithMembers = await Chat.find({
    $and: [
      { members: { $all: members.map(mem => mem._id) } },
      { groupChat: false }
    ]
  });
  const areInSameChat = chatsWithMembers.some(chat => chat.members.length > 1);
  if (areInSameChat) {
    return res.status(400).json({
      success: false,
      message: "Members already in a chat",
      chatId: chatsWithMembers[0]._id
    });
  } else {
    if (chatsWithMembers.length > 0) {
      return next({ chatId: chatsWithMembers[0]._id });
    } else {
      return next();
    }
  }
  // <<<<<<<  49835afd-c7fd-4516-8e0f-a9c896477cca  >>>>>>>
  next();
}

export {
  acceptRequestValidator,
  addMemberValidator,
  adminLoginValidator,
  chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  sendRequestValidator,
  validateHandler,
  PostValidator,
  BypassChatValidator,
};
