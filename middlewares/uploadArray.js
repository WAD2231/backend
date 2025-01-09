const uploadCloud = require("../helpers/uploadCloud");

module.exports =  async (req, res, next) => {
	if (req.files.length > 0) {
		const images = [];
		for (const file of req.files) {
			const result = await uploadCloud(file.buffer);
			images.push(result);
		}
		req.body.images = images;
	}else {
	}
	next();
};
