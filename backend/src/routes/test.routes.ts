import express from "express";
import TestController from "../controllers/test.controller";


// API /api/v1/test

export default express
  .Router()
  .post("/create_invitation", TestController.createInvitation)
  .get("/update_invitation/:id/:status", TestController.updateInvitationStatus)

  // cron jobs
  .get("/send_event_reminders", TestController.sendEventReminders)