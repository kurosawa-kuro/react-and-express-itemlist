import { db } from "./prisma/prismaClient.js";
import { prepareDatabaseOperation } from "./prepareDatabase.js";
import * as UserOperations from "./userOperations.js";
import * as PostOperations from "./postOperations.js";
import * as CommentOperations from "./commentOperations.js";
import * as TagOperations from "./tagOperations.js";
import * as PostTagOperations from "./postTagOperations.js";

const user1 = {
  username: "user1",
  password: "password1",
  email: "user1@example.com",
  newPassword: "password2",
};

const user2 = {
  username: "user2",
  password: "password1",
  email: "user2@example.com",
  newPassword: "password2",
};

const post1 = {
  title: "Sample Title 1",
  imageUrl: "https://example.com/sample-image1.jpg",
  imageName: "sample-image1.jpg",
  content: "This is a sample post 1",
};

const post2 = {
  title: "Sample Title 2",
  imageUrl: "https://example.com/sample-image2.jpg",
  imageName: "sample-image2.jpg",
  content: "This is a sample post 2",
};

const comment1 = {
  content: "This is a sample comment",
};

const tag1 = {
  name: "Sample Tag",
};

async function main() {
  await prepareDatabaseOperation();

  // Register two users
  const registeredUser1 = await UserOperations.registerUser(
    user1.username, user1.password, user1.email);
  console.log("Registered user 1:", registeredUser1);

  const registeredUser2 = await UserOperations.registerUser(
    user2.username, user2.password, user2.email);
  console.log("Registered user 2:", registeredUser2);

  // Retrieve user by their email
  const userByEmail = await UserOperations.getUserByEmail(registeredUser1.email);
  console.log("User retrieved by email:", userByEmail);

  // Authenticate and log in user 1
  const authenticatedUser = await UserOperations.loginUser(
    user1.email, user1.password);
  console.log("Authenticated user:", authenticatedUser);

  // Update user 1's password
  await UserOperations.updateUserPassword(
    registeredUser1.id, user1.password, user1.newPassword);
  console.log("User 1's password updated");

  // Make user 1 follow user 2
  const followedUser = await UserOperations.followUser(registeredUser1.id, registeredUser2.id);
  console.log("User 1 followed user 2:", followedUser);

  // Retrieve all followers of user 1
  const allFollowers = await UserOperations.readAllFollowers(registeredUser1.id);
  console.log("All followers of user 1:", allFollowers);

  // Create two new posts for user 1
  const createdPost1 = await PostOperations.createPost(
    registeredUser1.id,
    post1.title,
    post1.imageUrl,
    post1.imageName,
    post1.content
  );
  console.log("New post 1 created:", createdPost1);

  const createdPost2 = await PostOperations.createPost(
    registeredUser1.id,
    post2.title,
    post2.imageUrl,
    post2.imageName,
    post2.content
  );
  console.log("New post 2 created:", createdPost2);

  // Retrieve all existing posts
  const allPosts = await PostOperations.getAllPosts();
  console.log("All posts retrieved:", allPosts);

  // Retrieve post by its ID
  const postById = await PostOperations.getPostById(createdPost1.id);
  console.log("Post retrieved by ID:", postById);

  // Create a comment for post 1
  const createdComment = await CommentOperations.createComment(
    registeredUser1.id,
    createdPost1.id,
    comment1.content
  );
  console.log("New comment created for post 1:", createdComment);

  // Retrieve all existing comments
  const allComments = await CommentOperations.getAllComments();
  console.log("All comments retrieved:", allComments);

  // Retrieve comment by its ID
  const commentById = await CommentOperations.getCommentById(createdComment.id);
  console.log("Comment retrieved by ID:", commentById);

  // Create a new tag
  const createdTag = await TagOperations.createTag(tag1.name);
  console.log("New tag created:", createdTag);

  // Retrieve all existing tags
  const allTags = await TagOperations.getAllTags();
  console.log("All tags retrieved:", allTags);

  // Retrieve tag by its ID
  const tagById = await TagOperations.getTagById(createdTag.id);
  console.log("Tag retrieved by ID:", tagById);

  // Create a post-tag relation for post 1 and the created tag
  const createdPostTag = await PostTagOperations.createPostTag(
    createdPost1.id, createdTag.id);
  console.log("New post-tag relation created for post 1 and the tag:", createdPostTag);

  // Create a post-tag relation for post 2 and the created tag
  await PostTagOperations.createPostTag(
    createdPost2.id, createdTag.id);

  // Retrieve all existing post-tag relations
  const allPostTags = await PostTagOperations.getAllPostTags();
  console.log("All post-tag relations retrieved:", allPostTags);

  // Retrieve post-tag relations by the tag ID
  const postTagByTagId = await PostTagOperations.getPostTagsByTagId(createdPostTag.tagId);
  console.log("Post-tag relations retrieved by Tag ID:", postTagByTagId);
  console.log("Post-tag relations retrieved by Tag ID (JSON):", JSON.stringify(postTagByTagId));
  console.log("postTagByTagId[0].post.user.name:", postTagByTagId[0].post.user.name);
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    console.log("Finished database operations.");
    db.$disconnect()
  });
