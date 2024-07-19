import express from "express";
import TestController from "../controllers/test.controller";


// API /api/v1/test

export default express
  .Router()
  .post("/create_invitation", TestController.createInvitation)

  .get("/update_invitation/:invitation_id/:status", TestController.updateInvitationStatus)
  .get("/register_attendance/:invitation_id/:qr_code", TestController.registerAttendance)
  .get("/get_guests_by_event_id/:event_id", TestController.getGuestsByEventId)

  // cron jobs
  .get("/send_event_reminders", TestController.sendEventReminders)