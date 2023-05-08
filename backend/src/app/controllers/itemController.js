// Path: backend/src/app/controllers/itemController.js

import asyncHandler from "express-async-handler";
import { db } from "../../database/prisma/prismaClient.js";

export const getAllItems = asyncHandler(async (req, res) => {
    const items = await db.item.findMany();
    res.json(items);
});

export const createNewItem = asyncHandler(async (req, res) => {
    const newItem = await db.item.create({ data: req.body });
    res.status(201).json(newItem);
});

export default { getAllItems, createNewItem };
