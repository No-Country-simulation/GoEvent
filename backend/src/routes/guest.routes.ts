import { Router } from "express";
import guestController from "../controllers/guest.controller";


// API ROUTE /api/v1/guest
const router = Router();

// ------ GET ----------------------------
router
    .get("/test/all", guestController.getAllTest)
    .get("/", guestController.getAll)
    .get("/:id", guestController.getOne);

// ------ POST ----------------------------
router
    .post("/", guestController.createOne);

// ------ PATCH ----------------------------
router
    .patch("/:id", guestController.updateOne);

// ------ DELETE ----------------------------
router
    .delete("/:id", guestController.deleteOne)
    .delete("/all", guestController.deleteAll);


// ------ EXPORT ----------------------------
export default router
