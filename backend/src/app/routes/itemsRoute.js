// Path: backend/src/app/routes/itemsRoute.js

import asyncHandler from "express-async-handler";
import itemController from "../controllers/itemController.js";

const { getAllItems, createNewItem } = itemController;

const itemRoutes = (app) => {
    // Get all items
    app.get("/items", asyncHandler(getAllItems));

    // Create a new item
    app.post("/items", asyncHandler(createNewItem));
};

export default itemRoutes;
