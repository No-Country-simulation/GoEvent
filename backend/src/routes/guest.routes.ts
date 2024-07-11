import express from "express";
import multer from "multer";
// import AuthController from "../controllers/auth.controller";

const upload = multer();
// API /api/v1/guest

export default express
    .Router()
    .post("/", (req, res) => res.send("CREATE"))
    .get("/", (req, res) => res.send("READ"))
    .patch("/:gid", (req, res) => res.send("UPDATE"))
    .delete("/:gid", (req, res) => res.send("DELETE"))

//   .post("/register", upload.single("profile_image"), AuthController.register)
//   .post("/login", AuthController.login)
//   .get("/refreshToken/:token", AuthController.refreshToken)
