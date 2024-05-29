const dotenv = require("dotenv");

dotenv.config();

const admin = async (req, res, next) => {
  try {
    if(req.user.role != "admin") {
        return res.status(401).json({ status: false, message: "Only admin have access" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: error.message });
  }
};

module.exports = admin;
