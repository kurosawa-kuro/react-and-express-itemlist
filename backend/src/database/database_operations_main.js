// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_main.js
import { db } from "./prisma/prismaClient.js";

import {
  prepare_database_operation
} from "./prepareDatabase.js";

import {
  createUser,
  getUserByEmail
} from "./database_operations_user.js";

import {
  createPost,
  getAllPosts,
  getPostById
} from "./database_operations_post.js";

import {
  createComment,
  getAllComments,
  getCommentById,
} from "./database_operations_comment.js";

import {
  createTag,
  getAllTags,
  getTagById,
} from "./database_operations_tag.js";

import {
  createPostTag,
  getAllPostTags,
  getPostTagById,
} from "./database_operations_postTag.js";

async function main() {
  await prepare_database_operation();

  // Create User
  const newUser = await createUser("user1", "password1", "user1@example.com");
  console.log("Created user:", newUser);

  // Read User
  const userByEmail = await getUserByEmail(newUser.email);
  console.log("Retrieved user by email:", userByEmail);

  // Create Post
  const newPost = await createPost(
    newUser.id,
    "Sample Title",
    "https://example.com/sample-image.jpg",
    "sample-image.jpg",
    "This is a sample post"
  );
  console.log("Created post:", newPost);

  // Read All Posts
  const allPosts = await getAllPosts();
  console.log("All posts:", allPosts);

  // Read Single Post by ID
  const postById = await getPostById(newPost.id);
  console.log("Retrieved post by ID:", postById);

  // Create Comment
  const newComment = await createComment(
    newUser.id,
    newPost.id,
    "This is a sample comment"
  );
  console.log("Created comment:", newComment);

  // Read All Comments
  const allComments = await getAllComments();
  console.log("All comments:", allComments);

  // Read Single Comment by ID
  const commentById = await getCommentById(newComment.id);
  console.log("Retrieved comment by ID:", commentById);

  // Create Tag
  const newTag = await createTag("Sample Tag");
  console.log("Created tag:", newTag);

  // Read All Tags
  const allTags = await getAllTags();
  console.log("All tags:", allTags);

  // Read Single Tag by ID
  const tagById = await getTagById(newTag.id);
  console.log("Retrieved tag by ID:", tagById);

  // Create PostTag
  const newPostTag = await createPostTag(newPost.id, newTag.id, newUser.name);
  console.log("Created postTag:", newPostTag);

  // Read All PostTags
  const allPostTags = await getAllPostTags();
  console.log("All postTags:", allPostTags);

  // Read Single PostTag by ID
  const postTagById = await getPostTagById(newPostTag.id);
  console.log("Retrieved postTag by ID:", postTagById);
}

main()
  .catch((e) => console.error(e))
  .finally(() => db.$disconnect());
