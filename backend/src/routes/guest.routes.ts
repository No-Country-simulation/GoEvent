import { Router } from "express";
import GuestController from "../controllers/guest.controller";
import GuestService from "../services/guest.service";
import { Guest } from "../models/guest.model";

// ------ INSTANTIATE ----------------------------
const guestService = new GuestService(Guest);
const guestController = new GuestController(guestService);

// API ROUTE /api/v1/guest
const router = Router();

// ------ GET ----------------------------
router
    .get("/", guestController.getAll)
    .get("/:gid", guestController.getOne);

// ------ POST ----------------------------
router
    .post("/", guestController.createOne);

// ------ PATCH ----------------------------
router
    .patch("/:gid", guestController.updateOne);

// ------ DELETE ----------------------------
router
    .delete("/:gid", guestController.deleteOne)
    .delete("/all", guestController.deleteAll);

// ------ EXPORT ----------------------------
export default router
