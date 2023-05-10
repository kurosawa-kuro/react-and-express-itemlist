// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_main.js
import { db } from "./prisma/prismaClient.js";

import {
  prepare_database_operation
} from "./prepareDatabase.js";

import * as UserOperations from "./userOperations.js";
import * as PostOperations from "./postOperations.js";
import * as CommentOperations from "./commentOperations.js";
import * as TagOperations from "./tagOperations.js";
import * as PostTagOperations from "./postTagOperations.js";


async function main() {
  await prepare_database_operation();

  // Register User
  const newUser = await UserOperations.registerUser("user1", "password1", "user1@example.com");
  console.log("Register user:", newUser);

  // Read User
  const userByEmail = await UserOperations.getUserByEmail(newUser.email);
  console.log("Retrieved user by email:", userByEmail);

  // Login User
  const isloginUser = await UserOperations.loginUser("user1@example.com", "password1");
  console.log("Login user:", isloginUser);

  // updateUserPassword
  await UserOperations.updateUserPassword(newUser.id, "password1", "password2");
  console.log("Updated user password");

  // Create Post
  const newPost = await PostOperations.createPost(
    newUser.id,
    "Sample Title",
    "https://example.com/sample-image.jpg",
    "sample-image.jpg",
    "This is a sample post"
  );
  console.log("Created post:", newPost);

  // Read All Posts
  const allPosts = await PostOperations.getAllPosts();
  console.log("All posts:", allPosts);

  // Read Single Post by ID
  const postById = await PostOperations.getPostById(newPost.id);
  console.log("Retrieved post by ID:", postById);

  // Create Comment
  const newComment = await CommentOperations.createComment(
    newUser.id,
    newPost.id,
    "This is a sample comment"
  );
  console.log("Created comment:", newComment);

  // Read All Comments
  const allComments = await CommentOperations.getAllComments();
  console.log("All comments:", allComments);

  // Read Single Comment by ID
  const commentById = await CommentOperations.getCommentById(newComment.id);
  console.log("Retrieved comment by ID:", commentById);

  // Create Tag
  const newTag = await TagOperations.createTag("Sample Tag");
  console.log("Created tag:", newTag);

  // Read All Tags
  const allTags = await TagOperations.getAllTags();
  console.log("All tags:", allTags);

  // Read Single Tag by ID
  const tagById = await TagOperations.getTagById(newTag.id);
  console.log("Retrieved tag by ID:", tagById);

  // Create PostTag
  const newPostTag = await PostTagOperations.createPostTag(newPost.id, newTag.id, newUser.name);
  console.log("Created postTag:", newPostTag);

  // Read All PostTags
  const allPostTags = await PostTagOperations.getAllPostTags();
  console.log("All postTags:", allPostTags);

  // Read Single PostTag by ID
  const postTagById = await PostTagOperations.getPostTagById(newPostTag.id);
  console.log("Retrieved postTag by ID:", postTagById);
}

main()
  .catch((e) => console.error(e))
  .finally(() => db.$disconnect());
