import express from "express";
import UtilsController from "../controllers/utils.controller";


// API /api/v1/utils

export default express
  .Router()

  // cron jobs
  .get("/send_event_reminders", UtilsController.sendEventReminders)