const express = require("express");
const router = express.Router();
const imageController = require("./../controllers/image");
const jwt = require("./../middlewares/jwt");

router.get("/", imageController.getAll);
router.get("/user-info/:id", imageController.getUserOfImage);
router.get("/comment/:id", imageController.getCommentOfImage);
router.get("/saved-images/:userId", imageController.getSavedImagesByUserId);
router.get("/user/:userId", imageController.getImagesByUserId);

router.use(jwt.checkAccessToken);
router.get("/saved/:id", imageController.getStatusSaved);
router.post("/save", imageController.saveImage);
router.post("/create", imageController.createImage);
router.delete("/:id", imageController.deleteImage);

module.exports = router;
