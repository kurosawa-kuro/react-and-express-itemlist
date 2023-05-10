// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_main.js

import { db } from "./prisma/prismaClient.js";
import { prepareDatabaseOperation } from "./prepareDatabase.js";
import * as UserOperations from "./userOperations.js";
import * as PostOperations from "./postOperations.js";
import * as CommentOperations from "./commentOperations.js";
import * as TagOperations from "./tagOperations.js";
import * as PostTagOperations from "./postTagOperations.js";

const userData = {
  username: "user1",
  password: "password1",
  email: "user1@example.com",
  newPassword: "password2",
};

async function main() {
  await prepareDatabaseOperation();

  // Register a new user
  const registeredUser = await UserOperations.registerUser(userData.username, userData.password, userData.email);
  console.log("Registered user:", registeredUser);

  // Retrieve user by email
  const userByEmail = await UserOperations.getUserByEmail(registeredUser.email);
  console.log("User retrieved by email:", userByEmail);

  // Authenticate and login user
  const authenticatedUser = await UserOperations.loginUser(userData.email, userData.password);
  console.log("Authenticated user:", authenticatedUser);

  // Update user's password
  await UserOperations.updateUserPassword(registeredUser.id, userData.password, userData.newPassword);
  console.log("User password updated");

  // Create a new post
  const createdPostFirst = await PostOperations.createPost(
    registeredUser.id,
    "Sample Title 1",
    "https://example.com/sample-image.jpg",
    "sample-image1.jpg",
    "This is a sample post 1"
  );
  console.log("New post created:", createdPostFirst);

  const createdPostSecond = await PostOperations.createPost(
    registeredUser.id,
    "Sample Title 2",
    "https://example.com/sample-image.jpg",
    "sample-image2.jpg",
    "This is a sample post 2"
  );
  console.log("New post created:", createdPostSecond);

  // Retrieve all posts
  const allPosts = await PostOperations.getAllPosts();
  console.log("All posts retrieved:", allPosts);

  // Retrieve post by ID
  const postById = await PostOperations.getPostById(createdPostFirst.id);
  console.log("Post retrieved by ID:", postById);

  // Create a new comment
  const createdComment = await CommentOperations.createComment(
    registeredUser.id,
    createdPostFirst.id,
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
  const createdPostTag = await PostTagOperations.createPostTag(
    createdPostFirst.id, createdTag.id);
  console.log("New post-tag relation created:", createdPostTag);

  await PostTagOperations.createPostTag(
    createdPostSecond.id, createdTag.id);

  // Retrieve all post-tag relations
  const allPostTags = await PostTagOperations.getAllPostTags();
  console.log("All post-tag relations retrieved:", allPostTags);

  // Retrieve post-tag relation by Tag ID
  const postTagByTagId = await PostTagOperations.getPostTagsByTagId(createdPostTag.tagId);
  console.log("Post-tag relation retrieved by Tag ID:", postTagByTagId);
  console.log("Post-tag relation retrieved by Tag ID:", JSON.stringify(postTagByTagId));
  console.log("postTagByTagId[0].post.user.name:", postTagByTagId[0].post.user.name);
}

main().catch((e) => console.error(e)).finally(() => {
  console.log("Finished database operations.");
  db.$disconnect()
});