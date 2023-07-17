import Post, { IPost } from "../../api/models/Post";
import axios from "axios";

export async function fetchPostsFromDatabase(
  userId: string,
  skip: number,
  limit: number
): Promise<IPost[]> {
  return Post.find({ userId }).skip(skip).limit(limit).exec();
}

export async function fetchPostsFromAPI(userId: string): Promise<IPost[]> {
  const response = await axios.get(
    `${process.env.BASE_FETCH_API}/posts?userId=${userId}`
  );
  return response.data;
}

export async function storePostsInDatabase(postsData: IPost[]): Promise<void> {
  await Post.insertMany(postsData);
}

export async function findPostById(postId: string): Promise<IPost | null> {
  return Post.findById(postId);
}

export async function deletePostFromDatabase(post: IPost): Promise<void> {
  await post.deleteOne();
}
