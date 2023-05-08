const express = require("express");
const cors = require("cors");
const asyncHandler = require("express-async-handler");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 8080;

// CORS設定
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// morganのログフォーマットを指定します
app.use(morgan("tiny"));

// GETリクエストのルートエンドポイント
app.get(
  "/",
  asyncHandler(async (req, res) => {
    // レスポンスのJSONデータを返す
    res.json([
      { id: 1, name: "name 1" },
      { id: 2, name: "name 2" },
      { id: 3, name: "name 3" },
    ]);
  })
);

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
