import { Router } from "express";
import guestController from "../controllers/guest.controller";
import { errorHandler } from "../middlewares/error.middleware";


// API ROUTE /api/v1/guest
const router = Router();

// ------ GET ----------------------------
router
    .get("/", guestController.getAll)
    .get("/event/:eid", guestController.getAllInEvent)
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
    .delete("/event/:eid", guestController.deleteAll);

// ------ ERROR HANDLER ----------------------------
router.use(errorHandler);

// ------ EXPORT ----------------------------
export default router
