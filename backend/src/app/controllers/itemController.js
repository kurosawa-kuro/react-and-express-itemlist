// Path: backend/src/app/controllers/itemController.js

import { db } from "../../database/prisma/prismaClient.js";

export const getAllItems = async (req, res) => {
    const items = await db.item.findMany();
    res.json(items);
};

export const createNewItem = async (req, res) => {
    const newItem = await db.item.create({ data: req.body });
    res.status(201).json(newItem);
};

export default { getAllItems, createNewItem };
