const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");

router.post("/create", commentCtrl.create);
router.get("/post/:postId", commentCtrl.getPost);
router.delete("/delete/:id", commentCtrl.delete)

module.exports = router;