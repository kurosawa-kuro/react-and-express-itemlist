// Path: full-stack-basic\react-and-express-itemlist\backend\src\database\database_operations_user.js

import bcyptjs from "bcryptjs";
import { db } from "./prisma/prismaClient.js";

// Create
export async function createUser(name, password, email, isAdmin = false) {
  if (!name || !password || !email) {
    throw new Error("Name, password, and email are required");
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