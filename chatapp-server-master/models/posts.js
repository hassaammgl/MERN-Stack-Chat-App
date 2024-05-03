import mongoose, { Schema, model, Types } from "mongoose";

const schema = new Schema(
  {
    attachments: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.models.Posts || model("Posts", schema);
