const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const postMulter = require("../middlewares/post-multer-config");
const postCtrl = require("../controllers/post");

router.post("/create", auth, postMulter, postCtrl.post);
router.put("/update", auth, postMulter, postCtrl.updatePost);
router.get("/", auth, postCtrl.getPosts);
router.get("/:postId", auth, postCtrl.getPost)
router.get("/user/:userId", auth, postCtrl.getUserPosts);
router.delete("/delete/:id", auth, postCtrl.deletePost);

module.exports = router;