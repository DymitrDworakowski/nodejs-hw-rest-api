const Jimp = require("jimp");
const path = require("path");
const uploadDir = path.join("tmp");

const resizeImage = async (req, res, next) => {
  const originalname = req.file.filename; // Use req.file.filename to get the generated filename

  const imagePath = path.join(uploadDir, originalname);
  const image = await Jimp.read(imagePath);
 
  try {
    await image.resize(250, 250).write(imagePath); // Overwrite the original image with the resized one
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resizeImage;
