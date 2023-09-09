
const checkBody = (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  next();
};
module.exports =  checkBody;
