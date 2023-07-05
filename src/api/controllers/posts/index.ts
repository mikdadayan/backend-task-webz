import { RequestHandler } from "express";
import axios from "axios";

import { sendSuccessResponse } from "../../utils/createResponse";
import Post from "../../models/Post";

export const getUsersPosts: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const existingPosts = await Post.find({ userId })
      .skip(skip)
      .limit(limit)
      .exec();

    if (existingPosts.length > 0) {
      return sendSuccessResponse(
        res,
        "Using existing posts from the MongoDB database:",
        200,
        { posts: existingPosts }
      );
    } else {
      const response = await axios.get(
        `${process.env.BASE_FETCH_API}/posts?userId=${userId}`
      );
      const postsData = response.data;
      await Post.insertMany(postsData);

      return sendSuccessResponse(
        res,
        "Fetching user posts from the external API...",
        200,
        {
          posts: postsData.slice(skip, skip + limit),
        }
      );
    }
  } catch (error) {
    let err = error as Error;
    console.error("Error fetching and storing user posts:", error);
    next(err);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      res.status(404);
      throw new Error("Post not found");
    }
    await existingPost.deleteOne();
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    let err = error as Error;
    console.log(`Error: ${err.message}`);
    next(err);
  }
};
