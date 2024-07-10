import express from "express";
import multer from "multer";
import AuthController from "../controllers/auth.controller";

const upload = multer();
// API /api/v1/auth

export default express
  .Router()
  .post("/register", upload.single("profile_image"), AuthController.register)
  .post("/login", AuthController.login)
  .post("/refreshToken", AuthController.refreshToken)
