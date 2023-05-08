// app.js

import express from "express";
import asyncHandler from "express-async-handler";

const app = express();

// GETリクエストのルートエンドポイント
app.get(
  "/",
  asyncHandler(async (req, res) => {
    // レスポンスのJSONデータを返す
    console.log("☆☆☆☆ GET /");
    res.json([
      { id: 1, name: "name 1" },
      { id: 2, name: "name 2" },
      { id: 3, name: "name 3" },
    ]);
  })
);

export default app;
