import express from "express";
import TestController from "../controllers/test.controller";


// API /api/v1/test

export default express
  .Router()
  .post("/create_invitation", TestController.createInvitation)
  .get("/update_invitation/:id/:status", TestController.updateInvitationStatus)