// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_main.js

import { db } from "./prisma/prismaClient.js";
import { prepareDatabaseOperation } from "./prepareDatabase.js";
import * as UserOperations from "./userOperations.js";
import * as PostOperations from "./postOperations.js";
import * as CommentOperations from "./commentOperations.js";
import * as TagOperations from "./tagOperations.js";
import * as PostTagOperations from "./postTagOperations.js";


async function main() {
  await prepareDatabaseOperation();

  // Register a new user
  const registeredUser = await UserOperations.registerUser("user1", "password1", "user1@example.com");
  console.log("Registered user:", registeredUser);

  // Retrieve user by email
  const userByEmail = await UserOperations.getUserByEmail(registeredUser.email);
  console.log("User retrieved by email:", userByEmail);

  // Authenticate and login user
  const authenticatedUser = await UserOperations.loginUser("user1@example.com", "password1");
  console.log("Authenticated user:", authenticatedUser);

  // Update user's password
  await UserOperations.updateUserPassword(registeredUser.id, "password1", "password2");
  console.log("User password updated");

  // Create a new post
  const createdPost = await PostOperations.createPost(
    registeredUser.id,
    "Sample Title",
    "https://example.com/sample-image.jpg",
    "sample-image.jpg",
    "This is a sample post"
  );
  console.log("New post created:", createdPost);

  // Retrieve all posts
  const allPosts = await PostOperations.getAllPosts();
  console.log("All posts retrieved:", allPosts);

  // Retrieve post by ID
  const postById = await PostOperations.getPostById(createdPost.id);
  console.log("Post retrieved by ID:", postById);

  // Create a new comment
  const createdComment = await CommentOperations.createComment(
    registeredUser.id,
    createdPost.id,
    "This is a sample comment"
  );
  console.log("New comment created:", createdComment);

  // Retrieve all comments
  const allComments = await CommentOperations.getAllComments();
  console.log("All comments retrieved:", allComments);

  // Retrieve comment by ID
  const commentById = await CommentOperations.getCommentById(createdComment.id);
  console.log("Comment retrieved by ID:", commentById);

  // Create a new tag
  const createdTag = await TagOperations.createTag("Sample Tag");
  console.log("New tag created:", createdTag);

  // Retrieve all tags
  const allTags = await TagOperations.getAllTags();
  console.log("All tags retrieved:", allTags);

  // Retrieve tag by ID
  const tagById = await TagOperations.getTagById(createdTag.id);
  console.log("Tag retrieved by ID:", tagById);

  // Create a new post-tag relation
  const createdPostTag = await PostTagOperations.createPostTag(createdPost.id, createdTag.id, registeredUser.name);
  console.log("New post-tag relation created:", createdPostTag);

  // Retrieve all post-tag relations
  const allPostTags = await PostTagOperations.getAllPostTags();
  console.log("All post-tag relations retrieved:", allPostTags);

  // Retrieve post-tag relation by Tag ID
  const postTagByTagId = await PostTagOperations.getPostTagsByTagId(createdPostTag.tagId);
  console.log("Post-tag relation retrieved by ID:", JSON.stringify(postTagByTagId));
  console.log("postTagByTagId[0].post.user.name:", postTagByTagId[0].post.user.name);
}

main()
  .catch((e) => console.error(e))
  .finally(() => db.$disconnect());
