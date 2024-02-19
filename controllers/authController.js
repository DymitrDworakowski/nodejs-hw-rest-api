const userSchema = require("../models/user");
const userJoi = require("../schemas/shemaUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("node:fs/promises");
const path = require("node:path");
const gravatar = require("gravatar");

async function register(req, res, next) {
  const { error, value } = userJoi.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const user = await userSchema.findOne({ email: value.email });
    const avatarURL = gravatar.url(
      user,
      { s: "200", r: "g", d: "monsterid" },
      false
    );
    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }

    const passwordHash = await bcrypt.hash(value.password, 10);

    const newUser = await userSchema.create({
      avatarURL: avatarURL,
      name: value.name,
      email: value.email,
      password: passwordHash,
    });

    const responseUser = {
      avatarURL: avatarURL,
      email: newUser.email,
      subscription: newUser.subscription,
    };

    res.status(201).json({ user: responseUser });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  const { error, value } = userJoi.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const user = await userSchema.findOne({ email: value.email }).exec();
    if (user === null) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (isMatch !== true) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    await userSchema.findByIdAndUpdate(user._id, { token }).exec();
    const response = {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    };
    res.send(response);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    await userSchema.findByIdAndUpdate(req.user.id, { token: null }).exec();
    res.status(204);
  } catch (err) {
    next(err);
  }
}

async function current(req, res, next) {
  try {
    const user = await userSchema.findById(req.user.id).exec();

    const response = {
      email: user.email,
      subscription: user.subscription,
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

async function uploadAvatars(req, res, next) {
  try {
    await fs.rename(
      req.file.path,
      path.join("public/avatars", req.file.filename)
    );
    const PORT = process.env.PORT || 3000;
    const user = await userSchema
      .findByIdAndUpdate(
        req.user.id,
        { avatarURL: `avatars/${req.file.filename}` },
        { new: true }
      )
      .exec();
    if (user === null) {
      res.status(404).send({ message: "User not found" });
    }

    res
      .status(200)
      .send({ avatarURL: `http://localhost:${PORT}/${user.avatarURL}` });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, logout, current, uploadAvatars };
