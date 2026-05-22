const authService = require("../services/authService");
const { loginSchema } = require("../validators/authValidator");

const login = async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const result = await authService.login(payload);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const logout = (_req, res) => {
  res.status(204).send();
};

const me = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.sub);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  me,
};
