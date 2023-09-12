const multer = require("multer");
const crypto = require("node:crypto");
const path = require("node:path");

// const gravatar = require("gravatar");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("tmp"));
  },
 
  filename:(req, file, cb) => {
    
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();
    const newFileName = `${basename}${suffix}${extname}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

