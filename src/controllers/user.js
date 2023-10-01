const jwt = require("../middlewares/jwt");
const { responseSuccess } = require("../helpers/response");
const bcryptjs = require("bcryptjs");
const CONSTANT_MESSAGES = require("../constants/messages");
const tryCatch = require("../helpers/tryCatch");
const AppError = require("../helpers/AppError");
const userModel = require("./../database/db").models.users;

module.exports.getMe = tryCatch(async (req, res, next) => {
  res.status(200).json(responseSuccess(req.user));
});

module.exports.register = tryCatch(async (req, res, next) => {
  let data = await userModel.create(req.body);
  res.status(201).json(responseSuccess(data));
});

module.exports.login = tryCatch(async (req, res, next) => {
  let user = await userModel.findOne({ where: { email: req.body.email } });
  if (user) {
    user = JSON.parse(JSON.stringify(user));
    let checkPassword = bcryptjs.compareSync(req.body.password, user.password);
    if (checkPassword) {
      let accessToken = jwt.signAccessToken({
        id: user.id,
      });
      res.status(200).json(responseSuccess({ ...user, accessToken }));
    } else {
      next(new AppError(400, CONSTANT_MESSAGES.INVALID_PASSWORD));
    }
  } else {
    next(new AppError(404, CONSTANT_MESSAGES.USER_NOT_FOUND));
  }
});

module.exports.updateMe = tryCatch(async (req, res, next) => {
  if (req.body.status) delete req.body.status;
  if (req.body.password) delete req.body.password;

  let data = await userModel.update(req.body, { where: { id: req.user.id } });
  if (data[0] === 1) {
    data = await userModel.findOne({ where: { id: req.user.id } });
    res.status(201).json(responseSuccess(data));
  } else {
    next(new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED));
  }
});

module.exports.getOne = tryCatch(async (req, res, next) => {
  let data = await userModel.findOne({
    where: { id: req.params.id },
    attributes: ["email", "fullName", "avatar"],
  });
  res.status(200).json(responseSuccess(data));
});
