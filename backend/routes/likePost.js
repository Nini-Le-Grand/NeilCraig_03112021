const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const likePostCtrl = require("../controllers/likePost");

router.post("/create", auth, likePostCtrl.like);
router.get("/:postId", auth, likePostCtrl.getLikes);
router.delete("/delete/:id", auth, likePostCtrl.dislike);

module.exports = router;