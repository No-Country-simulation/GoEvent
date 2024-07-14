import express from "express";
import multer from "multer";
import passport from "../middlewares/auth.mid";
import EventController from "../controllers/event.controller";

const upload = multer();
// API /api/v1/event

export default express
  .Router()
  .post("/create", EventController.create)
  .get("/update/:id", EventController.findEventByUserId)
  .put("/update/:id", EventController.update)
  .delete("/delete",  EventController.delete)
