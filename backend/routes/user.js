const express = require("express");
const router = express.Router();
const userMulter = require("../middlewares/user-multer-config");
const limiter = require("../middlewares/rate-limit");
const validator = require("../middlewares/validate-user")

const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");


router.post("/signin", validator, userCtrl.signin);
router.post("/login", validator, limiter.maxConnections, userCtrl.login);

router.put("/updateProfile", auth, userMulter, userCtrl.updateProfile);
router.put("/updatePassword", auth, userCtrl.updatePassword);

router.get("/", auth, userCtrl.getProfiles);
router.get("/:userId", auth, userCtrl.getProfile);
router.get("/find/:value", auth,  userCtrl.findUsers);

router.delete("/delete/:imageUrl", auth, userCtrl.delete);



module.exports = router;