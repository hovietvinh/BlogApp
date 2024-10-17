const express = require("express");
const router = express.Router();
const controller = require("../controllers/post.controller")
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const middlewares = require("../middlewares/user.middleware.js")

router.post("/create",middlewares.check,upload.single('file'),controller.create);
router.get("/",controller.index);
router.get("/:id",controller.detail);
router.patch("/update/:id",middlewares.check,upload.single('file'),controller.update);

module.exports = router
