import express from "express";
import multer from "multer";
import passport from "../middlewares/auth.mid";
import UserController from "../controllers/user.controller";

const upload = multer();
// API /api/v1/user

export default express
  .Router()

  // -- Middlewares
  .use(passport.authenticate("userJWT", { session: false }))

  // -- Routes
  .put("/update", upload.single("profile_image"), UserController.update)
  .delete("/delete", UserController.delete)
