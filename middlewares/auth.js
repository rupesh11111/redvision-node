const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    token = token.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = auth;
