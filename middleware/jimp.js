const Jimp = require("jimp");
const path = require("path");
const uploadDir = path.join("tmp");

const resizeImage = async (req, res, next) => {
  if (req.file === undefined){
    return res.status(404).send({message: "File does not exist"}) 
  }
  const originalname = req.file.filename; 

  const imagePath = path.join(uploadDir, originalname);
  const image = await Jimp.read(imagePath);
 
  try {
    await image.resize(250, 250).write(imagePath); 
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = resizeImage;
