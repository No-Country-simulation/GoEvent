import express from "express";
import multer from "multer";
import passport from "../middlewares/auth.mid";
import UserController from "../controllers/user.controller";

const upload = multer();
// API /api/v1/auth

export default express
  .Router()
  .put("/update", passport.authenticate("userJWT", { session: false }), upload.single("profile_image"), UserController.update)
  .delete("/delete", passport.authenticate("userJWT", { session: false }), UserController.delete)
