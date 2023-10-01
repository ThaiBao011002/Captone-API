const { responseSuccess, responseWithError } = require("../helpers/response");
const CONSTANT_MESSAGES = require("../constants/messages");
const tryCatch = require("../helpers/tryCatch");
const imageModel = require("./../database/db").models.images;
const userModel = require("./../database/db").models.users;
const commentModel = require("./../database/db").models.comments;
const userImageModel = require("./../database/db").models.userImages;
const sequelize = require("sequelize");

module.exports.getAll = tryCatch(async (req, res, next) => {
  let condition = {};
  if (req.query.name) {
    condition.name = sequelize.where(
      sequelize.fn("LOWER", sequelize.col("images.name")),
      "LIKE",
      "%" + req.query.name.toLowerCase() + "%"
    );
  }
  let images = await imageModel.findAll({
    where: condition,
  });
  res.status(200).json(responseSuccess(images));
});

module.exports.getUserOfImage = tryCatch(async (req, res, next) => {
  let image = await imageModel.findOne({
    where: { id: req.params.id },
    include: {
      model: userModel,
      as: "users",
      attributes: ["id", "fullName", "avatar"],
    },
  });
  res.status(200).json(responseSuccess(image));
});

module.exports.getCommentOfImage = tryCatch(async (req, res, next) => {
  let image = await imageModel.findOne({
    where: { id: req.params.id },
    attributes: [],
    include: {
      model: commentModel,
      as: "comments",
      include: {
        model: userModel,
        as: "users",
        attributes: ["id", "fullName", "avatar"],
      },
    },
  });
  res.status(200).json(responseSuccess(image));
});

module.exports.getStatusSaved = tryCatch(async (req, res, next) => {
  let data = await userImageModel.findOne({
    where: {
      imageId: req.params.id,
      userId: req.user.id,
    },
  });
  let result = data === null ? false : true;
  res.status(200).json(responseSuccess(result));
});

module.exports.getImagesByUserId = tryCatch(async (req, res, next) => {
  let images = await imageModel.findAll({
    where: { userId: req.params.userId },
  });
  res.status(200).json(responseSuccess(images));
});

module.exports.deleteImage = tryCatch(async (req, res, next) => {
  let result = await imageModel.destroy({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });
  if (result === 0)
    return res
      .status(404)
      .json(responseWithError(CONSTANT_MESSAGES.DELETE_FAILED));
  res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY));
});

module.exports.createImage = tryCatch(async (req, res, next) => {
  let data = await imageModel.create({
    ...req.body,
    userId: req.user.id,
  });
  res.status(201).json(responseSuccess(data));
});

module.exports.getSavedImagesByUserId = tryCatch(async (req, res, next) => {
  let data = await userImageModel.findAll({
    where: { userId: req.params.userId },
    attributes: [],
    include: {
      model: imageModel,
      as: "images",
    },
  });
  res.status(200).json(responseSuccess(data));
});

module.exports.saveImage = tryCatch(async (req, res, next) => {
  let data = await userImageModel.create({
    userId: req.user.id,
    imageId: req.body.imageId,
  });
  res.status(200).json(responseSuccess(data));
});
