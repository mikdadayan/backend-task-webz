import { RequestHandler } from "express";
import { sendSuccessResponse } from "../../../utils/createResponse";
import {
  fetchPostsFromDatabase,
  fetchPostsFromAPI,
  storePostsInDatabase,
  findPostById,
  deletePostFromDatabase,
} from "../../../utils/api";

export const getUsersPosts: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const existingPosts = await fetchPostsFromDatabase(userId, skip, limit);

    if (existingPosts.length > 0) {
      return sendSuccessResponse(
        res,
        "Using existing posts from the MongoDB database:",
        200,
        { posts: existingPosts }
      );
    }

    const postsData = await fetchPostsFromAPI(userId);
    await storePostsInDatabase(postsData);

    const paginatedPosts = postsData.slice(skip, skip + limit);
    return sendSuccessResponse(
      res,
      "Fetching user posts from the external API...",
      200,
      { posts: paginatedPosts }
    );
  } catch (error) {
    console.error("Error fetching and storing user posts:", error);
    next(error);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const existingPost = await findPostById(postId);

    if (!existingPost) {
      res.status(404);
      throw new Error("Post not found");
    }

    await deletePostFromDatabase(existingPost);
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    let err = error as Error;
    console.error(error);
    next(err);
  }
};
