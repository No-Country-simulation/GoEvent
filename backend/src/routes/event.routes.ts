import express from "express";
import multer from "multer";
import passport from "../middlewares/auth.mid";
import EventController from "../controllers/event.controller";

const upload = multer();
// API /api/v1/event

export default express
  .Router()
  .post("/create", EventController.create)
  .get("/find/:id", EventController.findEventByUserId)
  .get("/findStatus", EventController.findEventByStatus)
  .get("/findGuests/:id", passport.authenticate("userJWT", { session: false }), EventController.getGuestsByEventId)
  .put("/update", EventController.update)
  .put("/updateTemplate", upload.single("template_image"), EventController.updateTemplate)
  .delete("/delete/:id", EventController.delete)
