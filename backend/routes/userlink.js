const express = require("express");
const router = express.Router();

const userlinkCtrl = require("../controllers/userlink");
const auth = require("../middlewares/auth");

router.post("/follow", auth, userlinkCtrl.follow);
router.delete("/unfollow/:linkId", auth, userlinkCtrl.unfollow);
router.get("/partner/:partnerId", auth, userlinkCtrl.getlink);
router.get("/user/:userId", auth, userlinkCtrl.getlinks)

module.exports = router;