const { responseSuccess } = require("../helpers/response");
const tryCatch = require("../helpers/tryCatch");
const fs = require("fs");

module.exports.upload = tryCatch(async (req, res, next) => {
  let path = `${Date.now()}-${req.file.originalname}`;
  fs.writeFileSync(`src/public/${path}`, req.file.buffer);
  res.status(200).json(responseSuccess(path));
});
