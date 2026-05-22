const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { AppError } = require("../middlewares/errorMiddleware");
const User = require("../models/User");

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
});

const login = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );

  return {
    token,
    user: publicUser(user),
  };
};

const getMe = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return publicUser(user);
};

module.exports = {
  getMe,
  login,
};
