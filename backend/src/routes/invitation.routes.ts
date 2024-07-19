import express from 'express';
import InvitationController from '../controllers/invitation.controller';

// API /api/v1/invitation

export default express
    .Router()
    .post("/create", InvitationController.create)
    .get("/find/:id", InvitationController.findInvitationByEventId)
    .put("/update", InvitationController.update)
    .post("/registerAttendance/:invitation_id/:qr_code", InvitationController.registerAttendance)
    .delete("/delete/:id", InvitationController.delete)

