import express from 'express';
import InvitationController from '../controllers/invitation.controller';
import passport from '../middlewares/auth.mid';

// API /api/v1/invitation

export default express
    .Router()
    .post("/create", InvitationController.create)
    .get("/find/:id", InvitationController.findInvitationByEventId)
    .put("/update", InvitationController.update)
    .get("/sendInvitationByEventId/:eventId", passport.authenticate('userJWT', { session: false }), InvitationController.sendInvitationByEventId)
    .post("/registerAttendance/:invitation_id/:qr_code", InvitationController.registerAttendance)
    .delete("/delete/:id", InvitationController.delete)

