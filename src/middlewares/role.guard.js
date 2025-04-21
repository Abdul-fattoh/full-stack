import { ForbiddenError } from "../common/index.js";

export const roleGuard = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new ForbiddenError();
      }

      next();
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const message = error.message;
      const name = error.name;

      res.status(statusCode).json({
        ok: false,
        error: {
          message,
          name,
        },
      });
    }
  };
};