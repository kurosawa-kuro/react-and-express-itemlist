// Path: backend/src/app/routes/items.js

import asyncHandler from "express-async-handler";
import { db } from "../../database/prisma/prismaClient.js";

const itemRoutes = (app) => {
    // Get all items
    app.get(
        "/items",
        asyncHandler(async (req, res) => {
            console.log("☆☆☆☆ GET /items");
            const items = await db.item.findMany();
            res.json(items);
        })
    );

    // Create a new item
    app.post(
        "/items",
        asyncHandler(async (req, res) => {
            const newItem = await db.item.create({ data: req.body });
            res.status(201).json(newItem);
        })
    );
};

export default itemRoutes;
