// Path: backend/src/app/index.js

import express from "express";
import itemRoutes from "./routes/itemsRoute.js";

const app = express();

app.use(express.json()); // Add this line to parse incoming JSON data

// Set up item routes
itemRoutes(app);

export default app;
