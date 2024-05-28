const User = require("../models/User")

const getUsers = () => {
    return User.find();
}