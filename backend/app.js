const express = require("express");
const path = require("path");

const helmet = require('helmet');

const userRoutes = require("./routes/user");
const userlinkRoutes = require("./routes/userlink")
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likePostRoutes = require("./routes/likePost");
const likeCommentRoutes = require("./routes/likeComment")

const app = express();
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, UserId");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());
app.use("/images/users", express.static(path.join(__dirname, "images/users")));
app.use("/images/posts", express.static(path.join(__dirname, "images/posts")));

app.use("/api/auth", userRoutes);
app.use("/api/userlink", userlinkRoutes);

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likePost", likePostRoutes);
app.use("/api/likeComment", likeCommentRoutes);

module.exports = app;