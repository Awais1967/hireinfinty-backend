const jwt = require("jsonwebtoken");

const { AppError } = require("./errorMiddleware");

const requireAdmin = (req, _res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    next(new AppError("Authentication required", 401));
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.role !== "ADMIN") {
      next(new AppError("Admin access required", 403));
      return;
    }

    req.user = payload;
    next();
  } catch (_error) {
    next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = {
  requireAdmin,
};
