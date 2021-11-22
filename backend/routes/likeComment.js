const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const likeCommentCtrl = require("../controllers/likeComment");

router.post("/create", auth, likeCommentCtrl.like);
router.get("/:commentId", auth, likeCommentCtrl.getLikes);
router.get("/user/:userId", auth, likeCommentCtrl.getUserLikes);
router.delete("/delete/:id", auth, likeCommentCtrl.dislike);

module.exports = router;