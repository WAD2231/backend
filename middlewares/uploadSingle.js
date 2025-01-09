const uploadCloud = require("../helpers/uploadCloud");

module.exports = async (req, res, next) => {
  if (req.file) {
    const result = await uploadCloud(req.file.buffer);
    req.body[req.file.fieldname] = result;
  }else {
  }
  next();
};
