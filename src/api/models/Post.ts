import mongoose, { Document, Model, Schema } from "mongoose";

interface IPost extends Document {
  userId: number;
  title: string;
  body: string;
}

const postSchema: Schema<IPost> = new mongoose.Schema({
  userId: Number,
  title: String,
  body: String,
});

const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);

export default Post;
