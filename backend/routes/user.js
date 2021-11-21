const express = require("express");
const router = express.Router();
const userMulter = require("../middlewares/user-multer-config");

const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");


router.post("/signin", userCtrl.signin);
router.post("/login", userCtrl.login);

router.put("/updateProfile", auth, userMulter, userCtrl.updateProfile);
router.put("/updatePassword", auth, userCtrl.updatePassword);

router.get("/", auth, userCtrl.getProfiles);
router.get("/:profile", auth, userCtrl.getProfile);

router.delete("/delete/:imageUrl", auth, userCtrl.delete);



module.exports = router;