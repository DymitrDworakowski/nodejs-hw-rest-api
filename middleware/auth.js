const jwt = require("jsonwebtoken");
const User = require("../models/user");

// async function auth(req, res, next) {
//   const authHeader = req.headers.authorization || " ";

//   const [bearer, token] = authHeader.split(" ", 2);
//   if (bearer !== "Bearer") {
//     return res.status(401).send({ message: "Not authorized" });
//   }
//   jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
//     if (err) {
//       if (err.name === "TokenExpiredError") {
//         return res.status(401).send({ message: "Token expired" });
//       }
//     }
//     try {
//       const user = await User.findById(decode.id).exec();
//       if (user.token !== token) {
//         return res.status(401).send({ message: "Not authorized" });
//       }
//       if (decode.id === undefined) {
//         return res.status(401).send({ message: "Not authorized" });
//       }

//       req.user = { id: decode.id, email: decode.email };

//       next();
//     } catch (err) {
//       next(err);
//     }
//   });
// }

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode.id || !decode.email) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(decode.id).exec();

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = { id: decode.id, email: decode.email };
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Not authorized" });
  }
}

module.exports = auth;
