const { responseSuccess } = require("../helpers/response");
const tryCatch = require("../helpers/tryCatch");
const commentModel = require("./../database/db").models.comments;

module.exports.commentImage = tryCatch(async (req, res, next) => {
  let data = {
    ...req.body,
    userId: req.user.id,
  };
  let comment = await commentModel.create(data);
  res.status(200).json(responseSuccess(comment));
});
