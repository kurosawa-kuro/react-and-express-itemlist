// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_user.js

import bcyptjs from "bcryptjs";
import { db } from "./prisma/prismaClient.js";

// Register User
export async function registerUser(name, password, email, isAdmin = false) {
  if (!name || !password || !email) {
    throw new Error("Name, password, and email are required");
  }

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  return await db.user.create({
    data: { name, password: await bcyptjs.hash(password, 10), email, isAdmin },
  });
}

// Read
export async function getUserByEmail(email) {
  if (!email) {
    throw new Error("Email is required");
  }

  return await db.user.findUnique({ where: { email } });
}