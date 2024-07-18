import express from 'express';
import InvitationController from '../controllers/invitation.controller';

export default express
    .Router()
    .post("/create", InvitationController.create)
    .get("/find/:id", InvitationController.findInvitationByEventId)
    .put("/update", InvitationController.update)
    .delete("/delete/:id", InvitationController.delete)

