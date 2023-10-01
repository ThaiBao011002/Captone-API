const express = require("express");
const router = express.Router();

const usersRouter = require("./user");
const imagesRouter = require("./image");
const commentsRouter = require("./comment");
const uploadsRouter = require("./upload");

router.use("/users", usersRouter);
router.use("/images", imagesRouter);
router.use("/comments", commentsRouter);
router.use("/upload", uploadsRouter);

module.exports = router;
