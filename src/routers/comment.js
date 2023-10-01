const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.js");
const jwt = require("./../middlewares/jwt");

router.use(jwt.checkAccessToken);
router.post("/", commentController.commentImage);

module.exports = router;
