import express from "express";
import multer from "multer";
import UserController from "../controllers/user.controller";

const upload = multer();
// API /api/v1/auth

export default express
  .Router()
  .put("/update", upload.single("profile_image"), UserController.update)
  .delete("/delete", UserController.delete)
