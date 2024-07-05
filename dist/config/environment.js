"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.CORS_ORIGIN = exports.SENDGRID_API_KEY = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.DB_URL = exports.SALT_ROUNDS = exports.API_VERSION = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.API_VERSION = process.env.API_VERSION;
exports.SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
exports.DB_URL = process.env.DB_URL ? process.env.DB_URL : 'mongodb://localhost:27017/eventos';
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
exports.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
exports.CORS_ORIGIN = process.env.CORS_ORIGIN;
exports.JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'VAU';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
