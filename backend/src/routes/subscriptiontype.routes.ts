import express from "express";
import passport from "../middlewares/auth.mid";
import SubscriptionTypeController from "../controllers/subscriptiontype.controller";


// API /api/v1/subscriptiontype

export default express
  .Router()
  .get("/getAll", passport.authenticate("userJWT", { session: false }), SubscriptionTypeController.getAll)