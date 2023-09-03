function validateContactFields(req, res, next) {
  const { name, email, phone } = req.body;
if (!req.body) {
  return res.status(400).json({ message: "missing fields" });
}
  if (!name) {
    return res.status(400).json({ message: "missing required name field" });
  }

  if (!email) {
    return res.status(400).json({ message: "missing required email field" });
  }

  if (!phone) {
    return res.status(400).json({ message: "missing required phone field" });
  }

  next();
}


module.exports = 
  validateContactFields;
