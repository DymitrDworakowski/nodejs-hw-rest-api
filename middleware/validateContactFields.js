// function validateContactFields(req, res, next) {
//   const { name, email, phone } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "missing required name field" });
//   }

//   if (!email) {
//     return res.status(400).json({ message: "missing required email field" });
//   }

//   if (!phone) {
//     return res.status(400).json({ message: "missing required phone field" });
//   }

//   next();
// }

const checkBody = (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
  }
  next();
};
module.exports =  checkBody;
