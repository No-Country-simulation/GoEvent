import express from "express";
import multer from "multer";
import passport from "../middlewares/auth.mid";
import TemplateController from "../controllers/template.controller";

const upload = multer();
// API /api/v1/template

export default express
  .Router()
  .post("/create", upload.single("template_image"), TemplateController.create)
  .get("/getTemplates", TemplateController.findAllTemplates)
  .put("/update", upload.single("template_image"), TemplateController.update)
  .delete("/delete", TemplateController.delete)
