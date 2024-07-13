import { Request, Response, NextFunction } from "express";
import HTTP_STATUS from "../constants/httpStatusCodes";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  console.error(error);
  // error.errors.map((e: any) => e.message).join(', ')}
  // Detectar errores específicos de Sequelize SequelizeDatabaseError
  if (error.name === "SequelizeValidationError" || error.name === "SequelizeDatabaseError") {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
      error: error.errors?.map((e: any) => e.message).join(", ") ?? error
    });
  }

  // Otros errores de base de datos o internos
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Internal server error.",
    error: error.errors?.map((e: any) => e.message).join(", ") || error.name || "InternalServerError"
  });
}
