import express from 'express';
import InvitationController from '../controllers/invitation.controller';
import passport from '../middlewares/auth.mid';

// API /api/v1/invitation

export default express
    .Router()
    .post("/create", InvitationController.create)
    .get("/find/:eventId", InvitationController.findInvitationByEventId)
    .put("/update/:invitationId", InvitationController.update)
    .get("/sendInvitationByEventId/:eventId", passport.authenticate('userJWT', { session: false }), InvitationController.sendInvitationByEventId)
    .post("/registerAttendance/:event_id/:qr_code", InvitationController.registerAttendance)
    .delete("/delete/:invitationId", InvitationController.delete)

