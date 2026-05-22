const { ZodError } = require("zod");

class AppError extends Error {
  constructor(message, statusCode = 500, details) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(422).json({
      error: "Validation failed",
      details: error.flatten(),
    });
  }

  if (error.code === "P2002") {
    return res.status(409).json({
      error: "Duplicate resource",
      details: error.meta,
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      error: "Duplicate resource",
      details: error.keyValue,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      error: "Invalid resource id",
    });
  }

  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : error.message;

  if (statusCode === 500) {
    console.error(error);
  }

  return res.status(statusCode).json({
    error: message,
    ...(error.details ? { details: error.details } : {}),
  });
};

module.exports = {
  AppError,
  errorHandler,
  notFoundHandler,
};
